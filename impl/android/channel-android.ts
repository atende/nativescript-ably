import * as api from "../../api/channel"
import { Presence } from "../../api/presence"
import { Param, PaginatedResult } from "../../api/common"
import { EventEmitter, ErrorInfo } from "../../api/common"

import { Observable } from "rxjs/Observable"

export class Channel extends EventEmitter<api.ChannelState, api.ChannelState> implements api.Channel {
    protected factory = function (callback: (param: any) => void): any {
        let listener = new io.ably.lib.realtime.ChannelStateListener({
            onChannelStateChanged: function (changed: any) {
                callback(changed)
            }
        })
        return listener;
    }
    constructor(protected facade: any, protected key: string) {
        super()
    }

    get state(): string {
        return this.facade.state
    }
    get reason(): ErrorInfo {
        return this.facade.errorReason
    }
    get name(): string {
        return this.facade.name
    }
    get presence(): Presence {
        return this.facade.presence
    }

    private worker: Worker

    publishData(name: string, data: any): Observable<void> {
        return Observable.create(observer => {
            let listener = new io.ably.lib.realtime.CompletionListener({
                onSuccess: function () {
                    observer.next()
                },
                onError: function (error: any) {
                    observer.error(error)
                }
            })
            try {
                this.facade.publish(name, data, listener)
            } catch (ex) {
                observer.error(ex)
            }

        })


    }
    publishMessage(message: api.Message | api.Message[]): Observable<void> {
        return Observable.create(observer => {
            let listener = new io.ably.lib.realtime.CompletionListener({
                onSuccess: function () {
                    observer.next()
                },
                onError: function (error: any) {
                    observer.error(error)
                }
            })
            try {
                this.facade.publish(message, listener)
            } catch (ex) {
                observer.error(ex)
            }
        })

    }
    subscribe(name?: string | string[]): Observable<api.Message> {
        return Observable.create(observer => {
            try {
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
                var me = this;
                // Disposable
                return function () {
                    me.facade.unsubscribe();
                };
            } catch (ex) { // Normalize possible exceptions on Java to Observable catch in Javascript
                observer.error(ex)
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
    /**
     * Retrieve the history of a channel
     * TODO Paginate, and return Message Objects
     */
    history(options: Param[]): Promise<any> {
        // We need to run in a background thread and make sure more than one worker
        // is not running at the same time
        let promise = new Promise( (resolve, reject) => {
            if (!this.worker) {
                this.worker = new Worker("./history.worker")
                this.worker.onmessage = (msg) => {
                    resolve(msg)
                    this.worker.terminate()
                    this.worker = null
                }
                this.worker.onerror = (error) => {
                    reject(error)
                    this.worker.terminate()
                    this.worker = null
                }
                this.worker.postMessage({key: this.key, channelId: this.name, params: options})
            }else {
                reject("History worker is already doing a job")
            }
        })
        return promise;
    }
    /**
     * Attach to this channel ensuring the channel is created in the Ably system and all messages published on the channel 
     * will be received by any channel listeners registered using subscribe()
     */
    attach() {
        this.facade.attach()
    }

    /**
     * Detach from this channel. Any resulting channel state change will be emitted to any listeners registered 
     * using the **on** or **once** methods.
     */
    detach() {
        this.facade.detach()
    }
}

// TODO implementar channels
export class Channels implements api.Channels {
    constructor(private facade: any, private key: string) {
    }
    get(channelName: string): api.Channel {
        let channel = this.facade.get(channelName)
        return new Channel(channel, this.key)
    }
    release(channelName: string) {
        this.facade.release(channelName)
    }
}
