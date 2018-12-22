export enum QUEUE_TYPES {
    JOIN_QUEUE = "JOIN_QUEUE",
    JOINED_QUEUE = "JOINED_QUEUE",
    RECEIVE_QUEUE = "RECEIVE_QUEUE",
    PLAYER_JOINED_QUEUE = "PLAYER_JOINED_QUEUE",
    REMOVE_ENTRY_FROM_QUEUE = "REMOVE_ENTRY_FROM_QUEUE"
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

export const addEntryToQueue = entry => ({
    type: QUEUE_TYPES.PLAYER_JOINED_QUEUE,
    entry
})

export const userLeftQueue = id => ({
    tye: QUEUE_TYPES.REMOVE_ENTRY_FROM_QUEUE,
    id
})