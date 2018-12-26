import { GAME_SOCKET_CHANNEL } from "../../src/components/GameScreen/game.socket";
import { LOBBY_SOCKET_CHANNEL } from "../../src/components/Lobby/lobby.socket";
import { Socket } from "socket.io";
import { GameState } from "../../src/components/GameScreen/game.interface";
import { GameRequest } from "../../src/components/GameRequests/interface";

const games = {

}

export const game = (socket, io) => {
    joinRoom(socket, io)
}

const organiseGameInfo = (socket_id, request:GameRequest) => {
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
        ]
        
    }


    return newInfo
}

const joinRoom = (socket:Socket, io) => {
    socket.on(LOBBY_SOCKET_CHANNEL.JOIN_ROOM, (roomId, request) => {
    
        socket.join(roomId)
        console.log(roomId)
        console.log(socket.rooms);
        
        // if (!games[roomId]) games[roomId] = {
    
        // } 
        const gameInfo = organiseGameInfo(socket.id, request)
        gameInfo["roomId"] = roomId
        console.log(socket.id, gameInfo)
        io.to(socket.id).emit(
            GAME_SOCKET_CHANNEL.READY_GAME,
            organiseGameInfo(socket.id, request)
        )
    
    })
}