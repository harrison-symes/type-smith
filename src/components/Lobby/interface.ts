export enum LOBBY_TYPES {
    RECEIVE_LOBBY = "RECEIVE_LOBBY",
    ADD_ENTRY_TO_LOBBY = "ADD_ENTRY_TO_LOBBY",
    REMOVE_ENTRY_FROM_LOBBY = "REMOVE_ENTRY_FROM_LOBBY"
} 

export interface LobbyEntry {
    id: number;
    user_id: number;
    socket_id: string;
    user_name: string;
}

export interface LobbyAction {
    type: LOBBY_TYPES;
    entry?: LobbyEntry;
    lobby?: LobbyEntry[];
    user_id?: number;
}

export type LobbyState = LobbyEntry[]
