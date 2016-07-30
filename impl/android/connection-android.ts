import * as api from "../../api/connection"
import {EventEmitter, ErrorInfo} from "../../api/common"

import {Observable} from "rxjs/Observable"


export class Connection extends EventEmitter<api.ConnectionState, api.ConnectionStateChange> implements api.Connection {

    /**
     * ConnectionStateListener factory for EventEmitter
     */
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
    set id(id: string) {
        this.facade.id = id
    }
    get state(): api.ConnectionState {
        return this.facade.state
    }
    set state(state: api.ConnectionState) {
        this.facade.state = state
    }
    get reason(): ErrorInfo {
        return this.facade.errorReason;
    }
    set reason(reason: ErrorInfo){
        this.reason = reason
    }
    get key(): string {
        return this.facade.key
    }
    set key(key: string){
        this.facade.key = key
    }
    get recoverKey(): string {
        return this.facade.recoverKey
    }
    set recoverKey(recoverKey: string){
        this.facade.recoverKey = recoverKey
    }
    get serial(): number {
        return this.facade.serial
    }
    set serial(serial: number){
        this.facade.serial = serial
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