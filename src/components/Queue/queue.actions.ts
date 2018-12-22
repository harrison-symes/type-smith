export enum QUEUE_TYPES {
    JOIN_QUEUE = "JOIN_QUEUE",
    JOINED_QUEUE = "JOINED_QUEUE",


}

export const joinQueue = () => ({
    type: QUEUE_TYPES.JOIN_QUEUE
})

export const queueJoined = () => ({
    type: QUEUE_TYPES.JOINED_QUEUE
})