import { QUEUE_TYPES } from "./queue.actions";

const initialState = {
    isInQueue: false,
    isJoiningQueue: false,
    lookingForGame: []
}

export interface QueueState {
    isInQueue: boolean;
    isJoiningQueue: boolean;
    lookingForGame: QueueEntry[];
} 

export interface QueueEntry {
    id: number;
    user_id: number;
    socket_id: string;
    user_name: string;
}

export interface QueueAction {
    type: QUEUE_TYPES;
    entry?: QueueEntry;
    lookingForGame?: QueueEntry[];
    id: number;
}

const queueReducer = (state: QueueState = initialState, action:QueueAction) : QueueState=> {
    const newState = {...state}
    switch(action.type) {
        case QUEUE_TYPES.JOIN_QUEUE:
            newState.isJoiningQueue = true
            newState.isInQueue = false
            return newState
        case QUEUE_TYPES.JOINED_QUEUE:
            newState.isJoiningQueue = false
            newState.isInQueue = true
            return newState
        case QUEUE_TYPES.RECEIVE_QUEUE:
            newState.lookingForGame = [...action.lookingForGame]
            return newState
        case QUEUE_TYPES.PLAYER_JOINED_QUEUE:
            newState.lookingForGame = [...newState.lookingForGame, action.entry]
            return newState
        case QUEUE_TYPES.REMOVE_ENTRY_FROM_QUEUE:
            newState.lookingForGame = [...newState.lookingForGame].filter(entry => entry.id !== action.id)
        default: 
            return state
    }
}



export default queueReducer