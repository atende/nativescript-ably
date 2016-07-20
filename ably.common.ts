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
export function createRealtimeConnection(options: string | ClientOptions): AblyRealtime {
    return
}
export interface ConnectionStateChange {
    previous: string
    current: string
    reason: ErrorInfo
    retryIn: number
}
export interface LasConnectionDetails {
    recoverKey: string
    diconnectedAt: number
    location: string
    clientId: string
}
export type ConnectionState = 'initialized' | 'connecting' | 'connected' | 'disconnected' | 'suspended' | 'closing' | 'closed' | 'failed';
export type ChannelState = 'initialized' | 'attaching' | 'attached' | 'detaching' | 'detached' | 'failed'
export type ErrorCallBack = (err: ErrorInfo) => void
export abstract class Connection {
    id: string
    state: ConnectionState
    errorReason: ErrorInfo
    key: string
    recoverKey: string
    serial: number
    abstract connect();
    abstract close();
    abstract on(listener: (stateChange: ConnectionStateChange) => void, state?: ConnectionState)
    abstract once(listener: (stateChange: ConnectionStateChange) => void, state?: ConnectionState)
    abstract off(listener: (stateChange: ConnectionStateChange) => void, state?: ConnectionState)
    abstract ping(callback: ErrorCallBack)
   
}

export interface Channels {
    get(channelName: string): Channel;
    release(channelName: string);
}
/**
 * TODO export presence interface
 */
export interface Presence {

}
/**
 * TODO export Message interface
 */
export interface Message {
    name: string
    data: any
    id: string
    clientId: string
    connectionId: string
    timestamp: number
    encoding: string
}
export interface Channel {
    state: string
    errorReason: ErrorInfo
    name: string
    presence: Presence
    publishData(name: string, data: any, callback?: ErrorCallBack)
    publishMessage(message: Message | Message[], callback?: ErrorCallBack)
    subscribe(listener: (message: Message) => void, name?: string | string[])
    unsubscribe(listener?: (message: Message) => void, name?: string)
    on(listener: (state: ChannelState) => void, state?: ChannelState)
    once(listener: (state: ChannelState) => void, state?: ChannelState)
    off(listener: (state: ChannelState) => void, state?: ChannelState)
}
/**
 * TODO how to get clientId?
 */
export abstract class AblyRealtime {
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

    abstract time(callback: (err: ErrorInfo, time: Number) => void);
}

