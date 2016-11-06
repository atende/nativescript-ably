import { Observable } from "rxjs";
export interface ErrorInfo {
    code: number;
    statusCode: number;
    message: string;
}
export declare enum LogLevel {
    NONE = 99,
    VERBOSE = 2,
    DEBUG = 3,
    INFO = 4,
    WARN = 5,
    ERROR = 6,
}
export declare abstract class EventEmitter<Listener, Event> {
    protected facade: any;
    protected factory: (callback: (param: any) => void) => any;
    on(listener?: Listener): Observable<Event>;
    off(listener?: Listener): Observable<Event>;
    once(listener?: Listener): Observable<Event>;
    emit(event: Event, ...args: any[]): void;
}
export declare type ErrorCallBack = (err: ErrorInfo) => void;
export interface PaginatedResult<T> {
    isLast: boolean;
    hasNext: boolean;
    first(): PaginatedResult<T>;
    items(): Array<T>;
    next(): PaginatedResult<T>;
}
export declare class Param {
    key: string;
    value: string;
}
