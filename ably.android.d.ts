import * as common from './ably.common';
export declare function createRealtimeConnection(options: string | common.ClientOptions): AblyRealtime;
export declare class AblyRealtime extends common.AblyRealtime {
    facade: any;
    constructor(options: string | common.ClientOptions);
    time(callback: (err: common.ErrorInfo, time: Number) => void): void;
}
export declare class Channel implements common.Channel {
    private facade;
    constructor(facade: any);
    state: string;
    errorReason: common.ErrorInfo;
    name: string;
    presence: common.Presence;
    publishData(name: string, data: any, callback?: (err: common.ErrorInfo) => void): void;
    publishMessage(message: common.Message | common.Message[], callback?: (err: common.ErrorInfo) => void): void;
    subscribe(callback: (message: common.Message) => void, name?: string | string[]): void;
    unsubscribe(callback?: (message: common.Message) => void, name?: string | string[]): void;
    on(listener: (state: common.ChannelState) => void, state?: common.ChannelState): void;
    once(listener: (state: common.ChannelState) => void, state?: common.ChannelState): void;
    off(listener: (state: common.ChannelState) => void, state?: common.ChannelState): void;
}
export declare class Channels implements common.Channels {
    private facade;
    constructor(facade: any);
    get(channelName: string): Channel;
    release(channelName: string): void;
}
