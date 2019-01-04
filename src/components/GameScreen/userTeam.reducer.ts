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
        if (target.health >= target.healthMax) target.health = target.healthMax
        if (target.ultimateCharge >= target.ultimateChargeMax) target.ultimateCharge = target.ultimateChargeMax

        if (target.energy >= target.energyMax) target.energy = target.energyMax

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
        case ATTACK_STACK_TYPES.SPEND_ULTIMATE_CHARGE:
            return modifyStat(newState, "ultimateCharge", false, action.ultimateChargeLoss, action.target)
        
        // stat gains
        case ATTACK_STACK_TYPES.GAIN_POWER:
            return modifyStat(newState, "power", true, action.powerGain, action.target)
        case ATTACK_STACK_TYPES.GAIN_ULTIMATE_CHARGE:
            return modifyStat(newState, "ultimateCharge", true, action.ultimateGain, action.target)
        case ATTACK_STACK_TYPES.GAIN_DEFENSE:
            return modifyStat(newState, "defense", true, action.defenseGain, action.target)
        case ATTACK_STACK_TYPES.GAIN_ENERGY:
            return modifyStat(newState, "energy", true, action.energyGain, action.target)
        case ATTACK_STACK_TYPES.GAIN_SPEED:
            return modifyStat(newState, "speed", true, action.speedGain, action.target)
        
        case ATTACK_STACK_TYPES.INCREASE_MAX_HEALTH:
            const firstState = modifyStat(newState, "healthMax", true, action.healthGain, action.target)
            return modifyStat(firstState, "health", true, action.healthGain, action.target)

        case ATTACK_STACK_TYPES.CHANGE_ALL_STATS:
            let stateHolder = modifyStat(newState, "energy", true, action.statChange, action.target)
            stateHolder = modifyStat(stateHolder, "power", true, action.statChange, action.target)
            stateHolder = modifyStat(stateHolder, "defense", true, action.statChange, action.target)
            stateHolder = modifyStat(stateHolder, "speed", true, action.statChange, action.target)
            return stateHolder

        case ATTACK_STACK_TYPES.TRAP_TARGET:
            target = newState.find(character => character.id == action.target.id)
            if (!target) return state
            idx = newState.indexOf(target)

            target.isTrapped = true

            newState[idx] = { ...target }
            return newState

        case ATTACK_STACK_TYPES.HEAL_TEAM:
            return newState.map(character => {
                if (character.owner_id == action.owner_id && character.isAlive) {
                    character.health += action.power
                    if (character.health > character.maxHealth) character.health = character.maxHealth
                }
                return {...character}
            })
        
        case ATTACK_STACK_TYPES.DAMAGE_TEAM:
            console.log({action})
            return newState.map(character => {
                if (character.owner_id == action.owner_id && character.isAlive) {
                    character.health -= action.power
                    if (character.health <= 0) {
                        character.isAlive = false
                        character.health = 0
                    }
                }
                return {...character}
            })
        
        case ATTACK_STACK_TYPES.CHANGE_TEAM_STAT:
            return newState.map(character => {
                if (character.owner_id == action.owner_id) {
                    character[action.stat] += action.statChange
                }
                return { ...character }
            })
            
        case ATTACK_STACK_TYPES.CHANGE_TEAM_STATS_ALL:
            return newState.map(character => {
                if (character.owner_id == action.owner_id) {
                    character[action.stat] += action.statChange
                }
                return { ...character }
            })
            
        case GAME_TYPES.TURN_VALIDATED:
            return newState.map(character => {
                if (character.isAlive && !character.isActive) {
                    character.energy += 1
                    if (character.energy > character.energyMax) character.energy = character.energyMax
                }
                if (character.isAlive && character.isActive) {
                    character.ultimateCharge+=1
                    if (character.ultimateCharge >= character.ultimateChargeMax) character.ultimateCharge = character.ultimateChargeMax
                }
                return {...character}
            })
        case ATTACK_STACK_TYPES.APPLY_SPIKE_TRAP:
            target = newState.find(character => character.id == action.target.id)
            if (!target) return state
            idx = newState.indexOf(target)

            target.isSpiked = true

            newState[idx] = { ...target }
            return newState
        case ATTACK_STACK_TYPES.ACTIVATE_SPIKE_TRAP:
            target = newState.find(character => character.id == action.target.id)
            if (!target) return state
            idx = newState.indexOf(target)

            target.isSpiked = false
            target.health -= 15
            if (target.health <= 0) {
                target.health = 0
                target.isAlive = false
            }

            newState[idx] = { ...target }
            return newState
            
        default:
            return state
    }
}