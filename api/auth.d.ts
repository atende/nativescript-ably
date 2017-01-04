import { ErrorInfo } from "./common";
export interface TokenParams {
    capability?: any;
    clientId?: string;
    nonce?: string;
    timestamp?: number;
    ttl?: number;
}
export interface AuthOptions {
    authCallback?: (tokenParams, callback: (err: any, tokenOrTokenRequest: any) => void) => void;
    authUrl?: string;
    authMethod?: string;
    authHeaders?: Map<string, string>;
    authParams?: Map<string, string>;
    force?: boolean;
    key?: string;
    queryTime?: boolean;
    token?: string;
    tokenDetails?: TokenDetails;
    useTokenAuth?: boolean;
}
export interface TokenDetails {
    token?: string;
    expires?: number;
    issued?: number;
    capability?: any;
    clientId?: string;
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
    createTokenRequest(tokenParams: TokenParams, authOptions: AuthOptions, callBack: (err: ErrorInfo, tokenRequest: TokenRequest) => void): any;
    requestToken(tokenParams: TokenParams, authOptions: AuthOptions, callback: (err: ErrorInfo, tokenDetails: TokenDetails) => void): any;
}
