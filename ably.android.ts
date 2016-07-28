import * as api from "./api/ably"
import {ErrorInfo} from "./api/common"
import {Connection} from "./impl/android/connection-android"
import {Channels} from "./impl/android/channel-android"

import {Observable} from "rxjs/Observable"

/**
 * TODO Implement clientId, implement Auth
 * TODO Problem: Unsubscribe on observable and in the ably android are not compatible. The user needs to unsubscribe on both?
 */
export class AblyRealtime extends api.AblyRealtime {
    private facade: any;
    constructor(options: string | api.ClientOptions) {
        super(options);
        this.facade = new io.ably.lib.realtime.AblyRealtime(options)
        this.connection = new Connection(this.facade.connection);
        this.channels = new Channels(this.facade.channels);
    }

    // TODO implement time
    time(callback: (err: ErrorInfo, time: Number) => void) {
        console.info("Time from android")
    }
}
