
declare module io {
    export module ably {
        export module lib {
            export module realtime {
                export class AblyRealtime extends io.ably.lib.rest.AblyRest {
                    channels: io.ably.lib.realtime.AblyRealtime.Channels;
                    connection: io.ably.lib.realtime.Connection;
                    constructor(key: string);
                    constructor(options: any);
                    public close();

                }
                export module AblyRealtime {
                    export class Channels extends java.util.HashMap<string, io.ably.lib.realtime.Channel> {
                        release(channelName: string);
                        suspendAll(error: io.ably.lib.types.ErrorInfo)
                        onChannelMessage(transport: io.ably.lib.types.ITransport, msg: io.ably.lib.types.ProtocolMessage)
                    }
                }
                export class Channel {
                    constructor(ably: io.ably.lib.realtime.AblyRealtime, name: string);
                    name: string
                    presence: io.ably.lib.realtime.Presence
                    state: io.ably.lib.realtime.ChannelState
                    reason: io.ably.lib.types.ErrorInfo
                    attachSerial: string
                    setState(newState: io.ably.lib.realtime.ChannelState, reason: io.ably.lib.types.ErrorInfo)
                    attach();
                    attach(listener: io.ably.lib.realtime.CompletionListener)
                    detach();
                    detach(listener: io.ably.lib.realtime.CompletionListener)
                    sync();
                    unsubscribe();
                    subscribe();
                    subscribe(listener: io.ably.lib.realtime.Channel.MessageListener);
                    unsubscribe(listener: io.ably.lib.realtime.Channel.MessageListener);
                    subscribe(name: string, listener: io.ably.lib.realtime.Channel.MessageListener);
                    unsubscribe(name: string, listener: io.ably.lib.realtime.Channel.MessageListener);
                    subscribe(name: string[], listener: io.ably.lib.realtime.Channel.MessageListener);
                    unsubscribe(name: string[], listener: io.ably.lib.realtime.Channel.MessageListener);
                    publish(name: string, data: java.lang.Object)
                    publish(message: io.ably.lib.types.Message)
                    publish(messages: io.ably.lib.types.Message[])
                    publish(name: string, data: java.lang.Object, listener: io.ably.lib.realtime.CompletionListener)
                    publish(message: io.ably.lib.types.Message, listener: io.ably.lib.realtime.CompletionListener)
                    publish(messages: io.ably.lib.types.Message[], listener: io.ably.lib.realtime.CompletionListener)
                    history(params: io.ably.lib.types.Param[]): io.ably.lib.types.PaginatedResult<io.ably.lib.types.Message>
                    setOptions(options: io.ably.lib.types.ChannelOptions)
                    onChannelMessage(msg: io.ably.lib.types.ProtocolMessage)
                }
                export module Channel {

                    export class MessageListener {
                        constructor(extend: any)
                        static extend: any
                        onMessage(message: io.ably.lib.types.Message)
                    }
                    export class ChannelStateCompletionListener implements ChannelStateListener {

                    }


                }
                export class ChannelState {
                    static extend: any
                }
                export class ChannelStateListener {
                    static extend: any
                }
                export class CompletionListener {
                    constructor(implementation: any)
                    static extend: any
                }
                export class Connection {
                    static extend: any
                }
                export class ConnectionState {
                    static extend: any
                }
                export class ConnectionStateListener {
                    constructor(implementation: any)
                }
                export class Presence {

                }
            }
            export module types {
                export class ClientOptions {
                    constructor();
                    constructor(key: string)
                    authUrl: string;
                    clientId: string;
                    logLevel: number;
                    tls: boolean;
                    port: number;
                    tlsPort: number;
                    autoConnect: boolean;
                    useBinaryProtocol: boolean;
                    echoMessages: boolean;
                    recover: string;
                    httpOpenTimeout: number;
                    httpRequestTimeout: number;
                    httpMaxRetryCount: number;
                }
                export class ErrorInfo {

                }
                export class ProtocolMessage {

                }
                export class ITransport {

                }
                export class Message {

                }
                export class ChannelOptions {

                }
                export class PaginatedResult<T> {

                }
                export class Param {

                }
            }
            export module rest {
                export class AblyRest {

                }
            }
            export module util {
                export enum Log {
                    VERBOSE
                }
            }
        }
    }
}