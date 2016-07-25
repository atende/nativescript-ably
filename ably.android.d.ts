import * as common from "./common";
export declare function createRealtimeConnection(options: string | common.ClientOptions): AblyRealtime;
export declare class AblyRealtime extends common.AblyRealtime {
    facade: any;
    constructor(options: string | common.ClientOptions);
    time(callback: (err: common.ErrorInfo, time: Number) => void): void;
}
export declare function createConnectionStateListener(callback: (param: any) => void): any;
