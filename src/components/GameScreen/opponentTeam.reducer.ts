import { GAME_TYPES } from "./game.interface";

export interface Character {

}

export interface TeamAction {
    type: GAME_TYPES;
    teamInfo?: {
        user_team: Character[],
        opponent_team: Character[],
    }
}

export type TeamState = Character[] 

const initialState = []

export default (state : any[] = initialState, action : TeamAction ):TeamState => {
    const newState = [...state]
    switch (action.type) {
        case GAME_TYPES.RECEIVE_TEAM_INFO:
            return action.teamInfo.opponent_team
        default:
            return state
    }
}