import {Observable} from "rxjs/Observable";

export interface ErrorInfo {
    code: number
    statusCode: number
    message: string
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
export abstract class EventEmitter<Listener, Event> {
    /**
     * Facade is the native implementation to delegate
     */
    protected facade: any

    /**
     * factory is a trick to create the native callback events, and let this class abstract
     */
    protected factory: (callback: (param: any) => void) => any
    
    /**
	 * Register the given listener for all events
	 * @param listener
	 */
    on(listener?: Listener): Observable<Event> {
        return Observable.create((observer) => {
            let callback = this.factory((param) => observer.next(param))
            if (listener) {
                this.facade.on(listener, callback)
            } else {
                this.facade.on(callback)
            }
        })
    }

    /**
	 * Remove registered listeners for a given type. If no type is passed remove all registers
     * @param listener
	 */
    off(listener?: Listener): Observable<Event> {
        return Observable.create((observer) => {
            let callback = this.factory((param) => observer.next(param))
            if (listener) {
                this.facade.off(listener, callback)
            } else {
                this.facade.off(callback)
            }
        })
    }

    /**
	 * Register the given listener for a single occurrence the event. All events if no listener
	 * @param listener
	 */
    once(listener?: Listener): Observable<Event> {
        return Observable.create((observer) => {
            let callback = this.factory((param) => observer.next(param))
            if (listener) {
                this.facade.once(listener, callback)
            } else {
                this.facade.once(callback)
            }
        })
    }

    /**
	 * Emit the given event (broadcasting to registered listeners)
	 * @param event the Event
	 * @param args the arguments to pass to listeners
     * TODO Test this on the device (How to serialize this javascript arguments to the native call?)
	 */
    emit(event: Event, ...args: any[]){
        this.facade.emit(event, args)
    }
}

export type ErrorCallBack = (err: ErrorInfo) => void
export interface PaginatedResult<T> {
    isLast: boolean
    hasNext: boolean
    first(): PaginatedResult<T>
    items(): Array<T>
    next(): PaginatedResult<T>
}
export class Param {
    constructor(public key: string, public value: string) {}
    toString() {
        return `{${this.key}, ${this.value}}`
    }
}



