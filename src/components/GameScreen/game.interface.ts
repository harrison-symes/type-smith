export enum GAME_TYPES {
    READY_GAME = "READY_GAME",
    START_GAME = "START_GAME"
}

export interface GameAction {
    type: GAME_TYPES,
    gameInfo?: Partial<GameState>
}

export interface GameState {
    user_id: number;
    user_socket_id?: string;
    opponent_id: number;
    opponent_socket_id?: string;
    gameReady: boolean;
    gameStarted: boolean;
}