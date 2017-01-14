import {Observable} from "rxjs"
import {ErrorInfo, EventEmitter, Param, PaginatedResult} from "./common"
import {Presence} from "./presence"

export interface Channel extends EventEmitter<ChannelState, ChannelState> {
    state: string
    reason: ErrorInfo
    name: string
    presence: Presence
    
    /**
     * Publish a single message on this channel based on a given event name and payload. 
     * @return A observable to notify about the success of operation.
     */
    publishData(name: string, data: any): Observable<void>
    
    /**
     * Publish several messages on this channel
     * @return A observable to notify about the success of operation.
     */
    publishMessage(message: Message | Message[]): Observable<void>
    
    /**
     * Subscribe to messages with a given event **name** on this channel. If no name is passed all events are listened
     * 
     * TODO Maybe the channel extending direct from Observable should be a better abstract than channel.subscribe().subscribe()
     * @return a Observable of messages to subscribe
     */
    subscribe(name?: string | string[]): Observable<Message>
    
    /**
     * Unsubscribe to messages on this channel for the specified event name. This removes an earlier event-specific subscription.
     * TODO Unsubscribe is not compatible with RXStream API. 
     * Maybe a custom observable that intercepts the unsubscribe on the observable? 
     */
    unsubscribe(listener?: (message: Message) => void, name?: string)
    
    /**
     * Gets a paginated set of historical messages for this channel. If the channel is configured to persist messages to disk, 
     * then message history will typically be available for 24 – 72 hours. If not, messages are only retained in memory 
     * by the Ably service for two minutes.
     * TODO Paginate, and convert to message
     */
    history(options: Param[]): Promise<any[]>
    
    /**
     * Attach to this channel ensuring the channel is created in the Ably system and all messages published on the channel 
     * will be received by any channel listeners registered using subscribe()
     */
    attach()
    
    /**
     * Detach from this channel. Any resulting channel state change will be emitted to any listeners registered 
     * using the **on** or **once** methods.
     */
    detach()

}

/**
 * Interface for channels object in AblyRealtime
 */
export interface Channels {
    get(channelName: string): Channel;
    release(channelName: string);
}

/**
 * A message represents an individual message that is send to or received from
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

/**
 * Represents the Realtime Channel States
 */
export type ChannelState = 'initialized' | 'attaching' | 'attached' | 'detaching' | 'detached' | 'failed'