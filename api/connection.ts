import {Observable} from 'rxjs/Observable';
import {ErrorInfo, EventEmitter} from './common';

/**
 * Represents the state event of a connection
 */
export interface ConnectionStateChange {
    previous: string
    current: string
    reason: ErrorInfo
    retryIn: number
}

/**
 * Represents the state of a connection.
 * 
 * **initialized**: A Connection object having this state has been initialized but no connection has yet been attempted.
 * 
 * **connecting**: A connection attempt has been initiated. The connecting state is entered as soon as the library has completed initialization,
 * and is reentered each time connection is re-attempted following disconnection.
 * 
 * **connected**: A connection exists and is active.
 * 
 * **disconnected**: A temporary failure condition. No current connection exists because there is no network connectivity or no host is available.
 * 
 * **suspended**: A long term failure condition. No current connection exists because there is no network connectivity or no host is available.
 * 
 * **closing**: An explicit request by the developer to close the connection has been sent to the Ably service. 
 * If a reply is not received from Ably within a short period of time, the connection will be forcibly terminated and the connection state will become closed.
 * 
 * **closed**: The connection has been explicitly closed by the client.
 * 
 * **failed**: An indefinite failure condition. This state is entered if a connection error has been received from the Ably service 
 * (such as an attempt to connect with invalid credentials). 
 * A failed state may also be triggered by the client library directly as a result of some local permanent error.
 * 
 * Tipical connection state sequences:
 * 
 * initialized → connecting → connected
 * connected → disconnected → connecting → connected
 * connected → disconnected → connecting → disconnected → … → connecting → connected
 * 
 * **Documentation**: [https://www.ably.io/documentation/realtime/connection](https://www.ably.io/documentation/realtime/connection)
 */
export type ConnectionState = 'initialized' | 'connecting' | 'connected' | 'disconnected' | 'suspended' | 'closing' | 'closed' | 'failed';

/**
 * Establishes and maintain a connection to the service
 * 
 * **Documentation**: [https://www.ably.io/documentation/realtime/connection](https://www.ably.io/documentation/realtime/connection)
 */
export interface Connection extends EventEmitter<ConnectionState,ConnectionStateChange> {
    id: string
    state: ConnectionState
    reason: ErrorInfo
    key: string
    recoverKey: string
    serial: number
    connect();
    close();
    ping(): Observable<void>;
   
}
