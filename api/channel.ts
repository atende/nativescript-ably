import {Observable} from "rxjs/Observable"
import {ErrorInfo, EventEmitter} from "./common"

export interface Channel extends EventEmitter<ChannelState, ChannelState> {
    state: string
    errorReason: ErrorInfo
    name: string
    presence: Presence
    publishData(name: string, data: any): Observable<void>
    publishMessage(message: Message | Message[]): Observable<void>
    subscribe(name?: string | string[]): Observable<Message>
    /**
     * TODO Unsubscribe is not compatible with RXStream API. 
     * Maybe a custom observable that intercepts the unsubscribe on the observable?
     */
    unsubscribe(listener?: (message: Message) => void, name?: string)

}

export interface Channels {
    get(channelName: string): Channel;
    release(channelName: string);
}

/**
 * TODO export presence interface
 */
export interface Presence {

}
/**
 * TODO export Message interface
 */
export interface Message {
    name: string
    data: any
    id: string
    clientId: string
    connectionId: string
    timestamp: number
    encoding: string
}
export type ChannelState = 'initialized' | 'attaching' | 'attached' | 'detaching' | 'detached' | 'failed'