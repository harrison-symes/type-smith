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
            currentTurn = getCurrentTurn(newState)


            message = {
                type: MESSAGE_TYPES.BOLD,
                message: action.abilityName == "Switch" 
                    ? `${action.characterName} is Switched out`
                    : `${action.characterName} uses ${action.abilityName}`
            }
            currentTurn.turnLog.push(message)
            
            return newState.map(t => ({...t}))
            
        case ATTACK_STACK_TYPES.DAMAGE_OPPONENT:
            currentTurn = getCurrentTurn(newState)

            message = {
                type: MESSAGE_TYPES.NORMAL,
                message: `${action.target.characterClass} takes ${action.power} damage`
            }
            
            currentTurn.turnLog.push(message)
            return newState.map(t => ({...t}))
        default: return state
    }
}