import * as api from "../../api/connection"
import {EventEmitter, ErrorInfo} from "../../api/common"

import {Observable} from "rxjs/Observable"


export class Connection extends EventEmitter<api.ConnectionState, api.ConnectionStateChange> implements api.Connection {

    protected factory = function (callback: (param: any) => void): any {
        let listener = new io.ably.lib.realtime.ConnectionStateListener({
            onConnectionStateChanged: function (changed: any) {
                callback(changed)
            }
        })
        return listener;
    }

    /**
    * Implementation for variables
    */
    get id(): string {
        return this.facade.id;
    }
    get state(): api.ConnectionState {
        return this.facade.state
    }
    get errorReason(): ErrorInfo {
        return this.facade.errorReason;
    }
    get key(): string {
        return this.facade.key
    }
    get recoverKey(): string {
        return this.facade.recoverKey
    }
    get serial(): number {
        return this.facade.serial
    }
    constructor(protected facade: any) {
        super()
    }

    connect() {
        this.facade.connect();
    }
    close() {
        this.facade.close();
    }
    ping(): Observable<void> {
        return Observable.create((observer) => {
            let listener = new io.ably.lib.realtime.CompletionListener({
                onSuccess: function () {
                    observer.next()
                },
                onError(reason: any) {
                    observer.throw(reason)
                }
            })
            this.facade.ping(listener)
        })

    }

}