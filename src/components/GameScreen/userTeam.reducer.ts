import { GAME_TYPES } from "./game.interface";
import { Character } from "../../interfacing/characters";
import { ATTACK_STACK_TYPES, AttackAction } from "../../../shared/attacks";

export interface TeamAction {
    type: GAME_TYPES;
    teamInfo?: {
        user_team: Character[],
        opponent_team: Character[],
    },
}

export type TeamState = Character[] 

const initialState = []

export default (state : any[] = initialState, action ):TeamState => {
    const newState = [...state]
    console.log({action})
    switch (action.type) {
        case GAME_TYPES.RECEIVE_TEAM_INFO:
            return action.teamInfo.user_team
        case ATTACK_STACK_TYPES.DAMAGE_OPPONENT:
            const target = newState.find(character => character.id == action.target.id)
            if (!target) return state
            const idx = newState.indexOf(target)

            target.health -= action.power
            if (target.health <= 0) target.isAlive = false

            newState[idx] = { ...target }
            return newState
        default:
            return state
    }
}