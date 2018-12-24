export enum GAME_REQUEST_TYPE {
    ADD_INCOMING_GAME_REQUEST = "ADD_INCOMING_GAME_REQUEST",
    ADD_OUTGOUNG_GAME_REQUEST = "ADD_OUTGOUNG_GAME_REQUEST",
    REMOVE_INCOMING_GAME_REQUEST = "REMOVE_INCOMING_GAME_REQUEST",
    REMOVE_OUTGOING_GAME_REQUEST = "REMOVE_OUTGOUNG_GAME_REQUEST",
}

export interface GameRequest {
    sender_id: number;
    target_id: number;
}

export type GameRequestsState = {
    inbound: GameRequest[],
    outbound: GameRequest[]
}

export interface GameRequestAction {
    type: GAME_REQUEST_TYPE,
    request?: GameRequest,
    user_id?: number;
}

