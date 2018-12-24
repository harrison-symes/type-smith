
export enum LFG_TYPES {
    OWN_PLAYER_JOINED_LOBBY = "OWN_PLAYER_JOINED_LOBBY",
    OWN_PLAYER_LEFT_LOBBY = "OWN_PLAYER_LEFT_LOBBY"
}

export type LFGState = boolean;

export interface LFGAction {
    type: LFG_TYPES
}