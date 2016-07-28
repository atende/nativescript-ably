import * as api from "../../api/channel"
import {EventEmitter, ErrorInfo} from "../../api/common"

import {Observable} from "rxjs/Observable"


export class Channel extends EventEmitter<api.ChannelState, api.ChannelState> implements api.Channel {
    protected factory = function(callback: (param: any) => void): any {
        let listener = new io.ably.lib.realtime.ChannelStateListener({
            onChannelStateChanged: function (changed: any) {
                callback(changed)
            }
        })
        return listener;
    }
    constructor(protected facade: any) {
        super()
    }

    get state(): string {
        return this.facade.state
    }
    get errorReason(): ErrorInfo {
        return this.facade.errorReason
    }
    get name(): string {
        return this.facade.name
    }
    get presence(): api.Presence {
        return this.facade.presence
    }

    publishData(name: string, data: any): Observable<void> {
        return Observable.create(observer => {
            let listener = new io.ably.lib.realtime.CompletionListener({
                onSuccess: function () {
                    observer.next()
                },
                onError: function (error: any) {
                    observer.throw(error)
                }
            })
            this.facade.publish(name, data, listener)
        })


    }
    publishMessage(message: api.Message | api.Message[]): Observable<void> {
        return Observable.create(observer => {
            let listener = new io.ably.lib.realtime.CompletionListener({
                onSuccess: function () {
                    observer.next()
                },
                onError: function (error: any) {
                    observer.throw(error)
                }
            })
            this.facade.publish(message, listener)
        })

    }
    subscribe(name?: string | string[]): Observable<api.Message> {
        return Observable.create(observer => {
            let listener = new io.ably.lib.realtime.Channel.MessageListener({
                onMessage: function (message: api.Message) {
                    observer.next(message)
                }
            })
            if (name) {
                this.facade.subscribe(name, listener)
            } else {
                this.facade.subscribe(listener)
            }
        })

    }
    unsubscribe(callback?: (message: api.Message) => void, name?: string | string[]) {

        let listener = new io.ably.lib.realtime.Channel.MessageListener({
            onMessage: function (message: api.Message) {
                callback(message)
            }
        })

        if (callback && name) {
            this.facade.unsubscribe(name, listener)
        } else if (callback) {
            this.facade.unsubscribe(listener)
        }
    }
}

// TODO implementar channels
export class Channels implements api.Channels {
    constructor(private facade: any) {
    }
    get(channelName: string): Channel {
        let channel = this.facade.get(channelName)
        return new Channel(channel)
    }
    release(channelName: string) {
        this.facade.release(channelName)
    }
}
