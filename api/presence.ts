/**
 * TODO export presence interface
 */
export interface Presence {
    enter(data?: any)
    leave(data?: any)
    update(data: any)
    get()                                                                                                                 
    subscribe()
    unsubscribe()
    enterClient()
}