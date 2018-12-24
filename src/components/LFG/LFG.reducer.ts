import { LFGState, LFG_TYPES } from "./interface";

const initialState : LFGState = false

const type = LFG_TYPES

export default (state : LFGState = initialState, action) => {
    switch(action.type) {
        case type.OWN_PLAYER_JOINED_LOBBY:
            return true
        case type.OWN_PLAYER_LEFT_LOBBY:
            return false
        default: 
            return state
    }
}