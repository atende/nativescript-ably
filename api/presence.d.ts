export interface Presence {
    enter(data?: any): any;
    leave(data?: any): any;
    update(data: any): any;
    get(): any;
    subscribe(): any;
    unsubscribe(): any;
    enterClient(): any;
}
