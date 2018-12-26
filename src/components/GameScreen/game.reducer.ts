import { GAME_TYPES, GameState, GameAction } from "./game.interface";

const initialState : GameState = {
    user_id: 0,
    opponent_id: 0,
    gameReady: false,
    gameStarted: false,
}

const types = GAME_TYPES

export default (state:GameState = initialState, action:GameAction) : GameState => {
    const newState = {...state}
    switch(action.type) {
        case types.READY_GAME:
            newState.user_id = action.gameInfo.user_id
            newState.user_socket_id = action.gameInfo.user_socket_id
            newState.opponent_id = action.gameInfo.opponent_id
            newState.opponent_socket_id = action.gameInfo.opponent_socket_id
            newState.gameReady = true
            return newState
        default:
            return state
    }
} 