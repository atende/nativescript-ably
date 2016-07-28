import {Observable} from "rxjs/Observable";

export interface TokenParams {
    capability: any
    clientId: string
    nonce: string
    timestamp: number
    ttl: number
}
/**
 * TODO Define Interface
 */
export interface AuthOptions {

}
export interface ErrorInfo {
    code: number
    statusCode: number
    message: string
}
export interface TokenDetails {
    token: string
    expires: number
    issued: number
    capability: any
    clientId: string
}
export interface TokenRequest {
    keyName: string
    ttl: number
    timestamp: number
    capability: any
    clientId: number
    nonce: string
    mac: string
}
export interface Auth {
    clientId: string
    authorize(tokenParams: TokenParams, authOptions: AuthOptions, callback: (err: ErrorInfo, tokenDetails: TokenDetails) => void)
    createTokenRequest(tokenParams: TokenParams, authOptions: AuthOptions, callBack: (err: ErrorInfo, tokenRequest: TokenRequest) => void)
    requestToken(tokenParams: TokenParams, authOptions: AuthOptions, callback: (err: ErrorInfo, tokenDetails: TokenDetails) => void)
}
export enum LogLevel {
    NONE = 99,
    VERBOSE = 2,
    DEBUG = 3,
    INFO = 4,
    WARN = 5,
    ERROR = 6
}
/**
 * Abstract class to construct events in ably realtime
 */
export abstract class EventEmitter<Filter, Event> {
    protected facade: any;

    protected factory: (callback: (param: any) => void) => any

    on(listenerType?: Filter): Observable<Event> {
        return Observable.create((observer) => {
            let callback = this.factory((param) => observer.next(param))
            if (listenerType) {
                this.facade.on(listenerType, callback);
            } else {
                this.facade.on(callback)
            }
        })
    }
    off(listenerType?: Filter): Observable<Event> {
        return Observable.create((observer) => {
            let callback = this.factory((param) => observer.next(param))
            if (listenerType) {
                this.facade.off(listenerType, callback);
            } else {
                this.facade.off(callback)
            }
        })
    }
    once(listenerType?: Filter): Observable<Event> {
        return Observable.create((observer) => {
            let callback = this.factory((param) => observer.next(param))
            if (listenerType) {
                this.facade.once(listenerType, callback);
            } else {
                this.facade.once(callback)
            }
        })
    }
}

export type ErrorCallBack = (err: ErrorInfo) => void




