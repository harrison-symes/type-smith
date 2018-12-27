import { GAME_TYPES } from "./game.interface";


export const receiveGameInfo = gameInfo => ({
    type: GAME_TYPES.READY_GAME,
    gameInfo
})

export const receiveTeamInfo = teamInfo => ({
    type: GAME_TYPES.RECEIVE_TEAM_INFO,
    teamInfo
})