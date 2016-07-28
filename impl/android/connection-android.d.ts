import * as api from "../../api/connection";
import { EventEmitter, ErrorInfo } from "../../api/common";
import { Observable } from "rxjs/Observable";
export declare class Connection extends EventEmitter<api.ConnectionState, api.ConnectionStateChange> implements api.Connection {
    protected facade: any;
    protected factory: (callback: (param: any) => void) => any;
    id: string;
    state: api.ConnectionState;
    errorReason: ErrorInfo;
    key: string;
    recoverKey: string;
    serial: number;
    constructor(facade: any);
    connect(): void;
    close(): void;
    ping(): Observable<void>;
}
