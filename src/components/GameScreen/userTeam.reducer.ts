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

export default (isUserTeam:boolean) => 
(state : any[] = initialState, action ):TeamState => {

    const newState = [...state]
    let target;
    let idx;

    const modifyStat = (stat:string, isGain: boolean, value:number, actionTarget:Character) => {
        target = newState.find(character => character.id == actionTarget.id)
        if (!target) return state
        idx = newState.indexOf(target)
        
        isGain 
            ? target[stat] += value
            : target[stat] -= value

        if (target[stat] <= 0) target[stat] = 0
        if (target.health <= 0) target.isAlive = false

        if (target.health >= target.maxHealth) target.health = target.maxHealth
        if (target.energy >= target.mamaxEnergyxHealth) target.energy = target.maxEnergy


        newState[idx] = { ...target }
        return newState
    } 

    switch (action.type) {
        case GAME_TYPES.RECEIVE_TEAM_INFO:
            return action.teamInfo[isUserTeam ? "user_team" : "opponent_team"]

        case ATTACK_STACK_TYPES.DAMAGE_OPPONENT:
            return modifyStat("health", false, action.power, action.target)

        case ATTACK_STACK_TYPES.DAMAGE_SELF:
            return modifyStat("health", false, action.power, action.target)

        case ATTACK_STACK_TYPES.HEAL_SELF:
            return modifyStat("health", true, action.power, action.target)
            
        case ATTACK_STACK_TYPES.HEAL_OPPONENT:
            return modifyStat("health", true, action.power, action.target)

        case ATTACK_STACK_TYPES.SPEND_ENERGY:
            return modifyStat("energy", false, action.energyLoss, action.target)
        
        // stat gains
        case ATTACK_STACK_TYPES.GAIN_POWER:
            return modifyStat("power", true, action.powerGain, action.target)
        case ATTACK_STACK_TYPES.GAIN_DEFENSE:
            return modifyStat("defense", true, action.defenseGain, action.target)
        case ATTACK_STACK_TYPES.GAIN_ENERGY:
            return modifyStat("energy", true, action.energyGain, action.target)
        case ATTACK_STACK_TYPES.GAIN_SPEED:
            return modifyStat("speed", true, action.speedGain, action.target)
            
        default:
            return state
    }
}