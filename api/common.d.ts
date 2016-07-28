import { Observable } from "rxjs/Observable";
export interface TokenParams {
    capability: any;
    clientId: string;
    nonce: string;
    timestamp: number;
    ttl: number;
}
export interface AuthOptions {
}
export interface ErrorInfo {
    code: number;
    statusCode: number;
    message: string;
}
export interface TokenDetails {
    token: string;
    expires: number;
    issued: number;
    capability: any;
    clientId: string;
}
export interface TokenRequest {
    keyName: string;
    ttl: number;
    timestamp: number;
    capability: any;
    clientId: number;
    nonce: string;
    mac: string;
}
export interface Auth {
    clientId: string;
    authorize(tokenParams: TokenParams, authOptions: AuthOptions, callback: (err: ErrorInfo, tokenDetails: TokenDetails) => void): any;
    createTokenRequest(tokenParams: TokenParams, authOptions: AuthOptions, callBack: (err: ErrorInfo, tokenRequest: TokenRequest) => void): any;
    requestToken(tokenParams: TokenParams, authOptions: AuthOptions, callback: (err: ErrorInfo, tokenDetails: TokenDetails) => void): any;
}
export declare enum LogLevel {
    NONE = 99,
    VERBOSE = 2,
    DEBUG = 3,
    INFO = 4,
    WARN = 5,
    ERROR = 6,
}
export declare abstract class EventEmitter<Filter, Event> {
    protected facade: any;
    protected factory: (callback: (param: any) => void) => any;
    on(listenerType?: Filter): Observable<Event>;
    off(listenerType?: Filter): Observable<Event>;
    once(listenerType?: Filter): Observable<Event>;
}
export declare type ErrorCallBack = (err: ErrorInfo) => void;
