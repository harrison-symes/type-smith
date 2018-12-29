export enum GAME_REQUEST_SOCKET_CHANNEL {
    RECEIVE_GAME_REQUEST_IN = "RECEIVE_GAME_REQUEST_IN",
    RECEIVE_GAME_REQUEST_OUT = "RECEIVE_GAME_REQUEST_OUT",
    SEND_GAME_REQUEST = "SEND_GAME_REQUEST",
    SENT_GAME_REQUEST = "SEND_GAME_REQUEST",
    DECLINE_GAME_REQUEST = "DECLINE_GAME_REQUEST",
    CANCEL_GAME_REQUEST = "CANCEL_GAME_REQUEST",
    REMOVE_GAME_REQUEST_IN = "REMOVE_GAME_REQUEST_IN",
    REMOVE_GAME_REQUEST_OUT = "REMOVE_GAME_REQUEST_OUT",
    ACCEPT_GAME_REQUEST = "ACCEPT_GAME_REQUEST",
}

export enum LFG_SOCKET_CHANNEL {
    USER_JOIN_LOBBY = "USER_JOIN_LOBBY",
    USER_LEAVE_LOBBY = "USER_LEAVE_LOBBY",
    USER_JOINED_LOBBY = "USER_JOINED_LOBBY",
    USER_LEFT_LOBBY = "USER_LEFT_LOBBY"
}

export enum GAME_SOCKET_CHANNEL {
    READY_GAME = "READY_GAME",
    PLAYER_JOINED_GAME = "PLAYER_JOINED_GAME",
    RECEIVE_TEAM_INFO = "RECEIVE_TEAM_INFO"
}

export enum LOBBY_SOCKET_CHANNEL {
    ENTRY_ADDED = "ENTRY_ADDED",
    ENTRY_REMOVED = "ENTRY_REMOVED",
    SIGNAL_JOIN_ROOM = "SIGNAL_JOIN_ROOM",
    JOIN_ROOM = "JOIN_ROOM"
}

export enum TEAM_PREVIEW_SOCKET_CHANNEL {
    SUBMIT_TEAM = "SUBMIT_TEAM",
}

export enum GAME_ACTION_SOCKET_CHANNEL {
    SUBMIT_TURN_ACTION = "SUBMIT_TURN_ACTION"
}