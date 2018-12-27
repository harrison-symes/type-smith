import { GAME_SOCKET_CHANNEL } from "../../src/components/GameScreen/game.socket";
import { LOBBY_SOCKET_CHANNEL } from "../../src/components/Lobby/lobby.socket";
import { Socket } from "socket.io";
import { GameState } from "../../src/components/GameScreen/game.interface";
import { GameRequest } from "../../src/components/GameRequests/interface";
import { TEAM_PREVIEW_SOCKET_CHANNEL } from "../../src/components/TeamPreview/teamPreview.socket";

const games = {

}

export const game = (socket, io) => {
    joinRoom(socket, io)
}

const organiseGameInfo = (socket_id, roomId, request:GameRequest) => {
    const isSender = request.sender_socket_id == socket_id
    
    const newInfo : Partial<GameState> = {
        user_socket_id: socket_id,
        opponent_socket_id: request[
            `${isSender ? "target" : "sender"}_socket_id` 
        ],
        opponent_id: request[
            isSender ? "target_id" : "sender_id"
        ],
        user_id: request[
            isSender ? "sender_id" : "target_id"
        ],
        roomId
        
    }


    return newInfo
}

const joinRoom = (socket:Socket, io) => {
    socket.on(LOBBY_SOCKET_CHANNEL.JOIN_ROOM, (roomId, request) => {
    
        socket.join(roomId)
        
        const gameInfo = organiseGameInfo(socket.id, roomId, request)
        
        if (!games[roomId]) games[roomId] = {
            readyPlayers: 0,
            player_ids: [],
            player_socket_ids: [],
        } 
        const obj = games[roomId][socket.id] = {
            user_id: gameInfo.user_id,
            team: [],
            socket_id: socket.id
        }
        games[roomId].player_ids.push(gameInfo.user_id)
        games[roomId].player_socket_ids.push(socket.id)
        games[roomId][gameInfo.user_id] = obj
        
        console.log(games)

        io.to(socket.id).emit(
            GAME_SOCKET_CHANNEL.READY_GAME,
            gameInfo
        )
        roomListeners(socket, io)
    })

   
}

const mapTeamToGameObjects = team => {
    return team.map(character => {
        character.hpStat = 3
        return character
    })
}

const getOpponentId = (user_id, game) => {
    return game.player_ids.find(id => id != user_id)
}

const roomListeners = (socket, io) => {
    socket.on(
        TEAM_PREVIEW_SOCKET_CHANNEL.SUBMIT_TEAM,
        (roomId, user_id, team) => {
            const game = games[roomId]
            const opponent_id = getOpponentId(user_id, game)
            game[user_id].team = mapTeamToGameObjects(team)
            game.readyPlayers++
            console.log({game})

            if (game.readyPlayers == 2) {
                io.to(roomId).emit(
                    GAME_SOCKET_CHANNEL.RECEIVE_TEAM_INFO,
                    {
                        user_team: game[user_id].team,
                        opponent_team: game[opponent_id].team
                    }
                )
            }
        }
    )
}