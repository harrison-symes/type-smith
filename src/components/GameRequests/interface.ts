export enum GAME_REQUEST_TYPE {
    ADD_INCOMING_GAME_REQUEST = "ADD_INCOMING_GAME_REQUEST",
    ADD_OUTGOUNG_GAME_REQUEST = "ADD_OUTGOUNG_GAME_REQUEST",
    REMOVE_INCOMING_GAME_REQUEST = "REMOVE_INCOMING_GAME_REQUEST",
    REMOVE_OUTGOING_GAME_REQUEST = "REMOVE_OUTGOUNG_GAME_REQUEST",
}

export interface GameRequest {
    id?: number;
    target_id: number;
    target_socket_id?:string;
    target_user_name: string;
    sender_id: number;
    sender_socket_id?:string;
    sender_user_name: string;
}

export type GameRequestsState = {
    inbound: GameRequest[],
    outbound: GameRequest[]
}

export interface GameRequestAction {
    type: GAME_REQUEST_TYPE,
    request?: GameRequest,
    request_id?: number;
}

