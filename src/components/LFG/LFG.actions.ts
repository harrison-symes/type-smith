import { LFG_TYPES } from "./interface";

export const ownPlayerLeftLobby = (user_id) => ({
    type: LFG_TYPES.OWN_PLAYER_LEFT_LOBBY
})

export const ownPlayerJoinedLobby = () => ({
    type: LFG_TYPES.OWN_PLAYER_JOINED_LOBBY
})