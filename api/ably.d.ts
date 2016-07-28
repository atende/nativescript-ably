import { Auth, TokenParams, ErrorInfo } from "./common";
import { Channels } from "./channel";
import { Connection } from "./connection";
export declare abstract class AblyRealtime {
    private keyOrOptions;
    auth: Auth;
    channels: Channels;
    clientId: string;
    connection: Connection;
    constructor(keyOrOptions: string | ClientOptions);
    connect(): void;
    close(): void;
    stats(): void;
    abstract time(callback: (err: ErrorInfo, time: Number) => void): any;
}
export interface ClientOptions {
    key?: string;
    token?: string;
    tokenDetails?: string;
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
    authCallback?: (tokenParams: any, callback: (err: any, tokenOrTokenRequest: any) => void) => void;
    authMethod?: string;
    authHeaders?: Map<string, string>;
    authParams?: Map<string, string>;
    useAuthToken?: boolean;
    transports?: string[];
    queueMessages?: boolean;
    closeOnUnload?: boolean;
    queryTime?: boolean;
    defaultTokenParams?: TokenParams;
    disconnectedRetryTimeout?: number;
    suspendedRetryTimeout?: number;
}
export declare function createRealtimeConnection(options: string | ClientOptions): AblyRealtime;
