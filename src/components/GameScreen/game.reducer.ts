import { GAME_TYPES, GameState, GameAction, GameStage, TurnStage } from "./game.interface";

const initialState : GameState = {
    user_id: 0,
    opponent_id: 0,
    gameStage: GameStage.PENDING,
    turnStage: TurnStage.CHOOSING
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
        case types.WAITING_FOR_OPPONENT:
            newState.turnStage = TurnStage.WAITING
            return newState
        case types.START_VALIDATING:
            newState.turnStage = TurnStage.VALIDATING
            return newState
        case types.TURN_VALIDATED:
            newState.turnStage = TurnStage.CHOOSING
            return newState
        default:
            return state
    }
} 