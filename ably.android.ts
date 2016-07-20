import * as common from './ably.common';
export function createRealtimeConnection(options: string | common.ClientOptions): AblyRealtime {

    return new AblyRealtime(options);
}
/**
 * TODO Implement clientId, implement Auth
 */
export class AblyRealtime extends common.AblyRealtime {
    facade: any;
    constructor(options: string | common.ClientOptions) {
        super(options);
        this.facade = new io.ably.lib.realtime.AblyRealtime(options)
        this.connection = new Connection(this.facade.connection);
        this.channels = new Channels(this.facade.channels);
    }

    // TODO implement time
    time(callback: (err: common.ErrorInfo, time: Number) => void) {
        console.info("Time from android")
    }
}

class Connection extends common.Connection {
    /**
    * Implementation for variables
    */
    get id(): string {
        return this.facade.id;
    }
    get state(): common.ConnectionState {
        return this.facade.state
    }
    get errorReason(): common.ErrorInfo {
        return this.facade.errorReason;
    }
    get key(): string {
        return this.facade.key
    }
    get recoverKey(): string {
        return this.facade.recoverKey
    }
    get serial(): number {
        return this.facade.serial
    }
    constructor(private facade: any) {
        super()
    }
    on(listener: (stateChange: common.ConnectionStateChange) => void, state?: common.ConnectionState) {
        let callback = new io.ably.lib.realtime.ConnectionStateListener({
            onConnectionStateChanged: function (changed: any) {
                listener(changed)
            }
        })
        if (state) {
            this.facade.on(state, callback);
        } else {
            this.facade.on(callback)
        }

    }

    once(listener: (stateChange: common.ConnectionStateChange) => void, state?: common.ConnectionState) {
        let callback = new io.ably.lib.realtime.ConnectionStateListener({
            onConnectionStateChanged: function (changed: any) {
                listener(changed)
            }
        })
        if (state) {
            this.facade.once(state, callback);
        } else {
            this.facade.once(callback)
        }

    }

    off(listener: (stateChange: common.ConnectionStateChange) => void, state?: common.ConnectionState) {
        let callback = new io.ably.lib.realtime.ConnectionStateListener({
            onConnectionStateChanged: function (changed: any) {
                listener(changed)
            }
        })
        if (state) {
            this.facade.off(state, callback);
        } else {
            this.facade.off(callback)
        }

    }

    ping(callback: (err: common.ErrorInfo) => void) {
        let listener = new io.ably.lib.realtime.CompletionListener({
            onSuccess: function () {
                callback(null)
            },
            onError(reason: any) {
                callback(reason)
            }
        })
        this.facade.ping(listener)
    }
    connect() {
        this.facade.connect();
    }
    close() {
        this.facade.close();
    }

}

export class Channel implements common.Channel {

    constructor(private facade: any) {

    }

    get state(): string {
        return this.facade.state
    }
    get errorReason(): common.ErrorInfo {
        return this.facade.errorReason
    }
    get name(): string {
        return this.facade.name
    }
    get presence(): common.Presence {
        return this.facade.presence
    }

    publishData(name: string, data: any, callback?: (err: common.ErrorInfo) => void) {
        if (callback) {
            let listener = new io.ably.lib.realtime.CompletionListener({
                onSuccess: function () {
                    callback(null)
                },
                onError: function (error: any) {
                    callback(error)
                }
            })
            this.facade.publish(name, data, callback)
        }else{
            this.facade.publish(name, data)
        }
    
    }
    publishMessage(message: common.Message | common.Message[], callback?: (err: common.ErrorInfo) => void) {
        if (callback) {
            let listener = new io.ably.lib.realtime.CompletionListener({
                onSuccess: function () {
                    callback(null)
                },
                onError: function (error: any) {
                    callback(error)
                }
            })
            this.facade.publish(message, callback)
        }else{
            this.facade.publish(message)
        }
    
    }
    subscribe(callback: (message: common.Message) => void, name?: string | string[]) {
        let listener = new io.ably.lib.realtime.Channel.MessageListener({
            onMessage: function (message: common.Message) {
                callback(message)
            }
        })
        if (name) {
            this.facade.subscribe(name, listener)
        } else {
            this.facade.subscribe(listener)
        }

    }
    unsubscribe(callback?: (message: common.Message) => void, name?: string | string[]) {

        let listener = new io.ably.lib.realtime.Channel.MessageListener({
            onMessage: function (message: common.Message) {
                callback(message)
            }
        })

        if (callback && name) {
            this.facade.unsubscribe(name, listener)
        } else if (callback) {
            this.facade.unsubscribe(listener)
        }
    }
    on(listener: (state: common.ChannelState) => void, state?: common.ChannelState) {

    }
    once(listener: (state: common.ChannelState) => void, state?: common.ChannelState) {

    }
    off(listener: (state: common.ChannelState) => void, state?: common.ChannelState) {

    }
}

// TODO implementar channels
export class Channels implements common.Channels {
    constructor(private facade: any) {
        console.log("Constructed Channels")

        console.log(facade)
    }
    get(channelName: string): Channel {
        let channel = this.facade.get(channelName)
        return new Channel(channel)
    }
    release(channelName: string) {
        this.facade.release(channelName)
    }
}
