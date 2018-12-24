import { GameRequest, GAME_REQUEST_TYPE } from "./interface";

export const receiveGameRequestInbound = (request:GameRequest) => ({
    type: GAME_REQUEST_TYPE.ADD_INCOMING_GAME_REQUEST,
    request
})
export const receiveGameRequestOutbound = (request:GameRequest) => ({
    type: GAME_REQUEST_TYPE.ADD_OUTGOUNG_GAME_REQUEST,
    request
})
export const removeGameRequestInbound = (request_id:number) => ({
    type: GAME_REQUEST_TYPE.REMOVE_INCOMING_GAME_REQUEST,
    request_id
})
export const removeGameRequestOutbound = (request_id:number) => ({
    type: GAME_REQUEST_TYPE.REMOVE_OUTGOING_GAME_REQUEST,
    request_id
})