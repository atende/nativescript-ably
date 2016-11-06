import {ErrorInfo} from "./common"
import {Auth, TokenParams} from "./auth";
import {Channels} from "./channel"
import {Connection} from "./connection"

/**
 * Stablishes and maintain a connection to the service
 * TODO how to get clientId?
 */
export class AblyRealtime {
    auth: Auth
    channels: Channels
    clientId: string
    connection: Connection;

    constructor(private keyOrOptions: string | ClientOptions) {

    }
    connect(){
        this.connection.connect();
    }

    close() {
        this.connection.close();
    }
    /**
     * TODO describe stats API
     */
    stats(){

    }

    time(callback: (err: ErrorInfo, time: Number) => void){

    }
}
/**
 * Client Connection and configuration Options
 */
export interface ClientOptions {
    key?: string
    token?: string,
    tokenDetails?: string,
    authUrl?: string;
    clientId?: string;
    logLevel?: number;
    tls?: boolean;
    port?: number;
    tlsPort?: number;
    autoConnect?: boolean;
    useBinaryProtocol?: boolean;
    echoMessages?: boolean;
    recover?: string;
    httpOpenTimeout?: number;
    httpRequestTimeout?: number;
    httpMaxRetryCount?: number;
    authCallback?: (tokenParams: any, callback: (err: any, tokenOrTokenRequest: any) => void) => void
    authMethod?: string
    authHeaders?: Map<string, string>
    authParams?: Map<string, string>
    useAuthToken?: boolean
    transports?: string[]
    queueMessages?: boolean
    closeOnUnload?: boolean
    queryTime?: boolean
    defaultTokenParams?: TokenParams
    disconnectedRetryTimeout?: number
    suspendedRetryTimeout?: number
}