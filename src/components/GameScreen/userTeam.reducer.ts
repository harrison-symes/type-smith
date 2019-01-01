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

    const modifyStat = (newState:TeamState, stat:string, isGain: boolean, value:number, actionTarget:Character) => {
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
        case "GET_USER_TEAM":
            if (isUserTeam) action.getTeam(state)
            return state
        case "GET_OPPONENT_TEAM":
            if (!isUserTeam) action.getTeam(state)
            return state
        case "GET_USER_ACTIVE":
            if (isUserTeam) action.getCharacter(state.find(character => character.isActive))
            return state
        case "GET_OPPONENT_ACTIVE":
            if (!isUserTeam) action.getCharacter(state.find(character => character.isActive))
            return state

        case ATTACK_STACK_TYPES.SWITCH:
            let newActive = newState.find(character => character.id == action.targetCharacter.id)
            if (!newActive) return state

            newState.forEach(character => character.isActive = false)
            idx = newState.indexOf(newActive)
            newActive.isActive = true
            newState[idx] = {...newActive}

            return newState.map(character => ({...character}))
        case ATTACK_STACK_TYPES.DAMAGE_OPPONENT:
            return modifyStat(newState, "health", false, action.power, action.target)

        case ATTACK_STACK_TYPES.DAMAGE_SELF:
            return modifyStat(newState, "health", false, action.power, action.target)

        case ATTACK_STACK_TYPES.HEAL_SELF:
            return modifyStat(newState, "health", true, action.power, action.target)
            
        case ATTACK_STACK_TYPES.HEAL_OPPONENT:
            return modifyStat(newState, "health", true, action.power, action.target)

        case ATTACK_STACK_TYPES.SPEND_ENERGY:
            return modifyStat(newState, "energy", false, action.energyLoss, action.target)
        
        // stat gains
        case ATTACK_STACK_TYPES.GAIN_POWER:
            return modifyStat(newState, "power", true, action.powerGain, action.target)
        case ATTACK_STACK_TYPES.GAIN_DEFENSE:
            return modifyStat(newState, "defense", true, action.defenseGain, action.target)
        case ATTACK_STACK_TYPES.GAIN_ENERGY:
            return modifyStat(newState, "energy", true, action.energyGain, action.target)
        case ATTACK_STACK_TYPES.GAIN_SPEED:
            return modifyStat(newState, "speed", true, action.speedGain, action.target)
        
        case ATTACK_STACK_TYPES.INCREASE_MAX_HEALTH:
            const firstState = modifyStat(newState, "healthMax", true, action.healthGain, action.target)
            return modifyStat(firstState, "health", true, action.healthGain, action.target)
        default:
            return state
    }
}