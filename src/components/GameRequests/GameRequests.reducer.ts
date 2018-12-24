import { GameRequestsState, GAME_REQUEST_TYPE, GameRequestAction } from "./interface";

const initialState : GameRequestsState = {
    inbound: [],
    outbound: []
}

const type = GAME_REQUEST_TYPE


export default (state : GameRequestsState = initialState, action:GameRequestAction) => {
    const newState = {...state}
    switch(action.type) {
        case type.ADD_INCOMING_GAME_REQUEST:
            newState.inbound = [...newState.inbound, action.request]
            return newState
        case type.ADD_OUTGOUNG_GAME_REQUEST:
            newState.outbound = [...newState.outbound, action.request]
            return newState
        case type.REMOVE_INCOMING_GAME_REQUEST:
            newState.inbound = [...newState.inbound].filter(
                request => request.id !== action.request_id 
                )
            return newState
        case type.REMOVE_OUTGOING_GAME_REQUEST:
            newState.outbound = [...newState.outbound].filter(
                request => request.id !== action.request_id 
            )
            return newState
        default:
            return state
    }
}