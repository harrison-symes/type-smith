import { LFGState, LFG_TYPES } from "./interface";
import { AUTH_TYPES } from "../Auth/auth.interface";

const initialState : LFGState = false

const type = LFG_TYPES

export default (state : LFGState = initialState, action) => {
    switch(action.type) {
        case type.OWN_PLAYER_JOINED_LOBBY:
            return true
        case type.OWN_PLAYER_LEFT_LOBBY:
            return false
        case AUTH_TYPES.LOGOUT_SUCCESS:
            return false
        default: 
            return state
    }
}