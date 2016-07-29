import * as api from "./api/ably";
import { ErrorInfo } from "./api/common";
export declare class AblyRealtime extends api.AblyRealtime {
    private facade;
    constructor(options: string | api.ClientOptions);
    time(callback: (err: ErrorInfo, time: Number) => void): void;
}
