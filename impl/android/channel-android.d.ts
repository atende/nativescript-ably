import * as api from "../../api/channel";
import { EventEmitter, ErrorInfo } from "../../api/common";
import { Observable } from "rxjs/Observable";
export declare class Channel extends EventEmitter<api.ChannelState, api.ChannelState> implements api.Channel {
    protected facade: any;
    protected factory: (callback: (param: any) => void) => any;
    constructor(facade: any);
    state: string;
    errorReason: ErrorInfo;
    name: string;
    presence: api.Presence;
    publishData(name: string, data: any): Observable<void>;
    publishMessage(message: api.Message | api.Message[]): Observable<void>;
    subscribe(name?: string | string[]): Observable<api.Message>;
    unsubscribe(callback?: (message: api.Message) => void, name?: string | string[]): void;
}
export declare class Channels implements api.Channels {
    private facade;
    constructor(facade: any);
    get(channelName: string): Channel;
    release(channelName: string): void;
}
