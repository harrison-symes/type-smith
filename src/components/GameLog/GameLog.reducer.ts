import { GAME_TYPES } from "../GameScreen/game.interface";
import { GAME_ATTACKS, ABILITY_ATTACK_STACK_TYPES, ATTACK_STACK_TYPES } from "../../../shared/attacks";



export enum MESSAGE_TYPES {
    NORMAL = "normal",
    BOLD = "bold",
    EXTRA_BOLD = "extra-bold"
}

export interface LogMessage {
    type: MESSAGE_TYPES;
    message: string;
}

export interface TurnState {
    turn: number;
    isComplete: boolean;
    turnLog: LogMessage[];
}

const initTurn = (number) : TurnState => ({
    turn: number,
    isComplete: false,
    turnLog: [
        {
            type: MESSAGE_TYPES.EXTRA_BOLD,
            message: `Turn ${number}`
        }
    ]
})

const getCurrentTurn = (state) : TurnState => state[state.length -1]

const initialState : TurnState[] = [
    initTurn(1)
]

const addMessage = (state: TurnState[], message: LogMessage) => {
    const currentTurn = getCurrentTurn(state)

    currentTurn.turnLog.push(message)

    return state.map(t => ({ ...t }))
}

export default (state:TurnState[] = initialState, action) => {
    const newState = [...state]
    let newTurn;
    let currentTurn;
    let message;
    switch(action.type) {
        case GAME_TYPES.TURN_VALIDATED:
            console.log({newState, length: newState.length, current: newState[newState.length -1]})
            currentTurn = newState[newState.length - 1]
            currentTurn.isComplete = true
            newState[newState.length - 1] = {...currentTurn}
            newState.push(initTurn(currentTurn.turn + 1))

            return newState
        case ATTACK_STACK_TYPES.USE_ATTACK:
            message = {
                type: MESSAGE_TYPES.BOLD,
                message: action.abilityName == "Switch" 
                    ? `${action.characterName} is Switched out`
                    : `${action.characterName} uses ${action.abilityName}`
            }
            return addMessage(newState, message)
        case ATTACK_STACK_TYPES.DAMAGE_OPPONENT:
            message = {
                type: MESSAGE_TYPES.NORMAL,
                message: `${action.target.characterClass} takes ${action.power} damage`
            }
            return addMessage(newState, message)
        case ATTACK_STACK_TYPES.GAIN_DEFENSE:
            message = {
                type: MESSAGE_TYPES.NORMAL,
                message: `${action.target.characterClass} ${action.defenseGain > 0 ? "gains" : "loses"} ${Math.abs(action.defenseGain)} Defense`
            }
            return addMessage(newState, message)
        case ATTACK_STACK_TYPES.GAIN_POWER:
            message = {
                type: MESSAGE_TYPES.NORMAL,
                message: `${action.target.characterClass} ${action.powerGain > 0 ? "gains" : "loses"} ${Math.abs(action.powerGain)} Power`
            }
            return addMessage(newState, message)
        case ATTACK_STACK_TYPES.GAIN_SPEED:
            message = {
                type: MESSAGE_TYPES.NORMAL,
                message: `${action.target.characterClass} ${action.speedGain > 0 ? "gains" : "loses"} ${Math.abs(action.speedGain)} Speed`
            }
            return addMessage(newState, message)
        case ATTACK_STACK_TYPES.GAIN_ULTIMATE_CHARGE:
            message = {
                type: MESSAGE_TYPES.NORMAL,
                message: `${action.target.characterClass} ${action.ultimateGain > 0 ? "gains" : "loses"} ${Math.abs(action.ultimateGain)} Ultimate Charge`
            }
            return addMessage(newState, message)
        case ATTACK_STACK_TYPES.GAIN_ENERGY:
            message = {
                type: MESSAGE_TYPES.NORMAL,
                message: `${action.target.characterClass} ${action.energyGain > 0 ? "gains" : "loses"} ${Math.abs(action.energyGain)} Energy`
            }
            return addMessage(newState, message)
        case ATTACK_STACK_TYPES.INCREASE_MAX_HEALTH:
            message = {
                type: MESSAGE_TYPES.NORMAL,
                message: `${action.target.characterClass} ${action.healthGain > 0 ? "gains" : "loses"} ${Math.abs(action.healthGain)} Max Health`
            }
            return addMessage(newState, message)
        case ATTACK_STACK_TYPES.HEAL_SELF:
            message = {
                type: MESSAGE_TYPES.NORMAL,
                message: `${action.target.characterClass} heals themselves for ${action.healthGain || action.healAmount || action.power} Health`
            }
            return addMessage(newState, message)
        default: return state
    }
}