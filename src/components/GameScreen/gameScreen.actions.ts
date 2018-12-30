import { GAME_TYPES } from "./game.interface";


export const receiveGameInfo = gameInfo => ({
    type: GAME_TYPES.READY_GAME,
    gameInfo
})

export const receiveTeamInfo = teamInfo => ({
    type: GAME_TYPES.RECEIVE_TEAM_INFO,
    teamInfo
})

export const waitForOpponent = () => ({
    type: GAME_TYPES.WAITING_FOR_OPPONENT
})

export const turnValidated = () => ({
    type: GAME_TYPES.TURN_VALIDATED
})