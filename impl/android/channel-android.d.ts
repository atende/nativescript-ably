import * as api from "../../api/channel";
import { Presence } from "../../api/presence";
import { Param, PaginatedResult } from "../../api/common";
import { EventEmitter, ErrorInfo } from "../../api/common";
import { Observable } from "rxjs/Observable";
export declare class Channel extends EventEmitter<api.ChannelState, api.ChannelState> implements api.Channel {
    protected facade: any;
    protected factory: (callback: (param: any) => void) => any;
    constructor(facade: any);
    state: string;
    reason: ErrorInfo;
    name: string;
    presence: Presence;
    publishData(name: string, data: any): Observable<void>;
    publishMessage(message: api.Message | api.Message[]): Observable<void>;
    subscribe(name?: string | string[]): Observable<api.Message>;
    unsubscribe(callback?: (message: api.Message) => void, name?: string | string[]): void;
    history(options: Param[]): PaginatedResult<api.Message>;
    attach(): void;
    detach(): void;
}
export declare class Channels implements api.Channels {
    private facade;
    constructor(facade: any);
    get(channelName: string): api.Channel;
    release(channelName: string): void;
}
