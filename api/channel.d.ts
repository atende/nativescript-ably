import { Observable } from "rxjs/Observable";
import { ErrorInfo, EventEmitter } from "./common";
export interface Channel extends EventEmitter<ChannelState, ChannelState> {
    state: string;
    errorReason: ErrorInfo;
    name: string;
    presence: Presence;
    publishData(name: string, data: any): Observable<void>;
    publishMessage(message: Message | Message[]): Observable<void>;
    subscribe(name?: string | string[]): Observable<Message>;
    unsubscribe(listener?: (message: Message) => void, name?: string): any;
}
export interface Channels {
    get(channelName: string): Channel;
    release(channelName: string): any;
}
export interface Presence {
}
export interface Message {
    name: string;
    data: any;
    id: string;
    clientId: string;
    connectionId: string;
    timestamp: number;
    encoding: string;
}
export declare type ChannelState = 'initialized' | 'attaching' | 'attached' | 'detaching' | 'detached' | 'failed';
