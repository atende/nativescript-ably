require("globals");

self.onmessage = function (msg) {
    console.info("Worker started")
    var key = msg.data.key
    var channelId = msg.data.channelId
    var params = []
    if (msg.data.params) {
        params = msg.data.params
    }
    var ably = new io.ably.lib.realtime.AblyRealtime(key)
    connect(ably).then(() => {
        console.info("Worker connected")
        let channel = ably.channels.get(channelId)
        attach(channel).then(() => {
            console.info("Worker attached")
            let options = params.map(_ => new io.ably.lib.types.Param(_.key, _.value));
            getHistory(channel, options).then((history) => {
                console.info("Worker history finished, closing connection")
                // ably.close()
                console.info("Send back history")
                sendBack(history)
            })
        })
    })

}

self.onerror = function (e) {
    console.log("An error occurred in worker. Main will handle this. Err: " + e);

    // return true to not propagate to main
}

function sendBack(message) {
    (<any>self).postMessage(message)
}

function connect(ably): Promise<any> {
    let promise = new Promise(function (resolve, reject) {
        if (ably != null) {
            let listener = new io.ably.lib.realtime.ConnectionStateListener({
                onConnectionStateChanged: function (state) {
                    if (state.current.name() == 'connected') {
                        resolve()
                    }

                }
            })
            ably.connection.on(listener)
        } else {
            reject("Ably is null")
        }
    })
    return promise
}

function attach(channel): Promise<any> {
    let promise = new Promise(function (resolve, reject) {
        if (channel == null) {
            reject()
            return
        }
        let listener = new io.ably.lib.realtime.ChannelStateListener({
            onChannelStateChanged: function (changed: any) {
                if (changed == 'attached') {
                    resolve()
                }
            }
        })
        channel.on(listener)
        channel.attach()
    })
    return promise
}

function getHistory(channel, params): Promise<any[]> {
    
    let promise = new Promise(function (resolve, reject) {
        let resultPage = channel.history(params);
        let items = resultPage.items()
        let retorno = []
        for (let i = 0; i < items.length; i++) {
            let item = items[i].data
            retorno.push(JSON.parse(item.toString()))
        }
        resolve(retorno)
    })
    return promise
}