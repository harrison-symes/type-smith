import { LobbyEntry, LobbyAction, LOBBY_TYPES, LobbyState } from "./interface";
import { AUTH_TYPES } from "../Auth/auth.interface";

const initialState = []

const type = LOBBY_TYPES

const lobbyReducer = (state: LobbyState = initialState, action : LobbyAction): LobbyState => {
    const newState = [...state]
    switch (action.type) {
        case type.RECEIVE_LOBBY:
            return action.lobby
        case type.ADD_ENTRY_TO_LOBBY:
            return [...newState, action.entry]
        case type.REMOVE_ENTRY_FROM_LOBBY:
            return newState.filter(entry => entry.user_id != action.user_id)
        case AUTH_TYPES.LOGOUT_SUCCESS:
            return []
        default:
            return state
    }
}



export default lobbyReducer