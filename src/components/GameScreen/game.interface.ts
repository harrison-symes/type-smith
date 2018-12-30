export enum GAME_TYPES {
    READY_GAME = "READY_GAME",
    START_GAME = "START_GAME",
    RECEIVE_TEAM_INFO = "TEAM_INFO",
    WAITING_FOR_OPPONENT = "WAITING_FOR_OPPONENT"
}

export interface GameAction {
    type: GAME_TYPES,
    gameInfo?: Partial<GameState>
}

export enum GameStage {
    PENDING = "PENDING",
    PRE_GAME = "PRE_GAME",
    GAME_STARTED = "GAME_STARTED"
}

export enum TurnStage {
    CHOOSING = "CHOOSING",
    WAITING = "WAITING"
}

export interface GameState {
    roomId?: any;
    user_id: number;
    user_socket_id?: string;
    opponent_id: number;
    opponent_socket_id?: string;
    gameStage?: GameStage;
    turnStage: TurnStage;
}