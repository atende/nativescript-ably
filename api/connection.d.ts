import { ErrorInfo, EventEmitter } from './common';
export interface ConnectionStateChange {
    previous: string;
    current: string;
    reason: ErrorInfo;
    retryIn: number;
}
export declare type ConnectionState = 'initialized' | 'connecting' | 'connected' | 'disconnected' | 'suspended' | 'closing' | 'closed' | 'failed';
export interface Connection extends EventEmitter<ConnectionState, ConnectionStateChange> {
    id: string;
    state: ConnectionState;
    errorReason: ErrorInfo;
    key: string;
    recoverKey: string;
    serial: number;
    connect(): any;
    close(): any;
}
