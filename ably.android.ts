/**
 * TODO Problem: Unsubscribe on observable and in the ably android are not compatible. The user needs to unsubscribe on both?
 */
import * as common from "./common";
import {Observable} from "rxjs";
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

export function createConnectionStateListener(callback: (param: any) => void): any {
export function createConnectionStateListener(callback: (param: any) => void): any {
    let listener = new io.ably.lib.realtime.ConnectionStateListener({
        onConnectionStateChanged: function (changed: any) {
            callback(changed)
        }
    })
    return listener;
}

export function createChannelStateListener(callback: (param: any) => void): any {
    let listener = new io.ably.lib.realtime.ChannelStateListener({
        onChannelStateChanged: function (changed: any) {
            callback(changed)
        }
    })
    return listener;
}

export class EventEmitter<Filter, Event> {
    protected facade: any;

    factory: (callback: (param: any) => void) => any

    on(listenerType?: Filter): Observable<Event> {
        return Observable.create((observer) => {
            let callback = this.factory((param) => observer.next(param))
            if (listenerType) {
                this.facade.on(listenerType, callback);
            } else {
                this.facade.on(callback)
            }
        })
    }
    off(listenerType?: Filter): Observable<Event> {
        return Observable.create((observer) => {
            let callback = this.factory((param) => observer.next(param))
            if (listenerType) {
                this.facade.off(listenerType, callback);
            } else {
                this.facade.off(callback)
            }
        })
    }
    once(listenerType?: Filter): Observable<Event> {
        return Observable.create((observer) => {
            let callback = this.factory((param) => observer.next(param))
            if (listenerType) {
                this.facade.once(listenerType, callback);
            } else {
                this.facade.once(callback)
            }
        })
    }
}

export class Connection extends EventEmitter<common.ConnectionState, common.ConnectionStateChange> implements common.Connection {

    factory = createConnectionStateListener

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
    constructor(protected facade: any) {
        super()
    }

    connect() {
        this.facade.connect();
    }
    close() {
        this.facade.close();
    }
    ping(): Observable<void> {
        return Observable.create((observer) => {
            let listener = new io.ably.lib.realtime.CompletionListener({
                onSuccess: function () {
                    observer.next()
                },
                onError(reason: any) {
                    observer.throw(reason)
                }
            })
            this.facade.ping(listener)
        })

    }

}

export class Channel extends EventEmitter<common.ChannelState, common.ChannelState> implements common.Channel {
    factory = createChannelStateListener
    constructor(protected facade: any) {
        super()
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
    publishMessage(message: common.Message | common.Message[]): Observable<void> {
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
    subscribe(name?: string | string[]): Observable<common.Message> {
        return Observable.create(observer => {
            let listener = new io.ably.lib.realtime.Channel.MessageListener({
                onMessage: function (message: common.Message) {
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
}

// TODO implementar channels
export class Channels implements common.Channels {
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
