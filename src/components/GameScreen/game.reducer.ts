import { GAME_TYPES, GameState, GameAction, GameStage } from "./game.interface";

const initialState : GameState = {
    user_id: 0,
    opponent_id: 0,
    gameStage: GameStage.PENDING,
}

const types = GAME_TYPES

export default (state:GameState = initialState, action:GameAction) : GameState => {
    const newState = {...state}
    switch(action.type) {
        case types.READY_GAME:
            for (let key in action.gameInfo) newState[key] = action.gameInfo[key]
            newState.gameStage = GameStage.PRE_GAME
            return newState
        case types.RECEIVE_TEAM_INFO:
            newState.gameStage = GameStage.GAME_STARTED
            return newState
        default:
            return state
    }
} 