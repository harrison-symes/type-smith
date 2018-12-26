import { GAME_TYPES } from "./game.interface";


export const receiveGameInfo = gameInfo => ({
    type: GAME_TYPES.READY_GAME,
    gameInfo
})