import { LobbyEntry, LOBBY_TYPES } from "./interface";

export const receiveLobby = (lobby: LobbyEntry[]) => ({
    type: LOBBY_TYPES.RECEIVE_LOBBY,
    lobby
})

export const addEntryToLobby = (entry: LobbyEntry) => ({
    type: LOBBY_TYPES.ADD_ENTRY_TO_LOBBY,
    entry
})

export const removeEntryFromLobby = (user_id: number) => ({
    type: LOBBY_TYPES.REMOVE_ENTRY_FROM_LOBBY,
    user_id
})
