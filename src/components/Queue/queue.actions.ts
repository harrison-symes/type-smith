export enum QUEUE_TYPES {
    JOIN_QUEUE = "JOIN_QUEUE",
    JOINED_QUEUE = "JOINED_QUEUE",
    RECEIVE_QUEUE = "RECEIVE_QUEUE",
    PLAYER_JOINED_QUEUE = "PLAYER_JOINED_QUEUE",
    ADD_ENTRY_TO_QUEUE = "ADD_ENTRY_TO_QUEUE",
    REMOVE_ENTRY_FROM_QUEUE = "REMOVE_ENTRY_FROM_QUEUE",
    PLAYER_LEFT_QUEUE = "PLAYER_LEFT_QUEUE"
}

export const joinQueue = () => ({
    type: QUEUE_TYPES.JOIN_QUEUE
})

export const queueJoined = () => ({
    type: QUEUE_TYPES.JOINED_QUEUE
})

export const receiveQueue = (lookingForGame) => ({
    type: QUEUE_TYPES.RECEIVE_QUEUE,
    lookingForGame
})

export const addPlayerEntryToQueue = entry => ({
    type: QUEUE_TYPES.PLAYER_JOINED_QUEUE,
    entry
})
export const addEntryToQueue = entry => ({
    type: QUEUE_TYPES.ADD_ENTRY_TO_QUEUE,
    entry
})

export const userLeftQueue = id => ({
    type: QUEUE_TYPES.REMOVE_ENTRY_FROM_QUEUE,
    id
})

export const ownUserLeftQueue = () => ({
    type: QUEUE_TYPES.PLAYER_LEFT_QUEUE
})