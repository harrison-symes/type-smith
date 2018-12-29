import { GameRequest } from "../../src/components/GameRequests/interface";
import { leaveLobby } from "../db/lobby";
import { GAME_REQUEST_SOCKET_CHANNEL, LOBBY_SOCKET_CHANNEL, LFG_SOCKET_CHANNEL } from "../../shared/socketChannels";

let idCounter = 1;

export const gameRequests = (socket, io) => {
    socket.on(
        GAME_REQUEST_SOCKET_CHANNEL.SEND_GAME_REQUEST,
        request => {
            
            request["id"] = ++idCounter;
            request["sender_socket_id"] = socket.id;
            io.to(socket.id).emit(
                GAME_REQUEST_SOCKET_CHANNEL.SENT_GAME_REQUEST,
                request
            )
            io.to(request.target_socket_id).emit(
                GAME_REQUEST_SOCKET_CHANNEL.RECEIVE_GAME_REQUEST_IN,
                request
            )
            io.to(request.sender_socket_id).emit(
                GAME_REQUEST_SOCKET_CHANNEL.RECEIVE_GAME_REQUEST_OUT,
                request
            )
        }
    )

    socket.on(
        GAME_REQUEST_SOCKET_CHANNEL.CANCEL_GAME_REQUEST,
        request => {
            io.to(request.target_socket_id).emit(
                GAME_REQUEST_SOCKET_CHANNEL.REMOVE_GAME_REQUEST_IN,
                request.id
            )
            io.to(request.sender_socket_id).emit(
                GAME_REQUEST_SOCKET_CHANNEL.REMOVE_GAME_REQUEST_OUT,
                request.id
            )
        }
    )
    socket.on(
        GAME_REQUEST_SOCKET_CHANNEL.ACCEPT_GAME_REQUEST,
        (request: GameRequest) => {
            const roomName = request.id

            //alert both users of room to join
            io.to(request.sender_socket_id).emit(
                LOBBY_SOCKET_CHANNEL.SIGNAL_JOIN_ROOM,
                roomName,
                request
            )
            io.to(request.target_socket_id).emit(
                LOBBY_SOCKET_CHANNEL.SIGNAL_JOIN_ROOM,
                roomName,
                request
            )

            //remove both users from lobby
            leaveLobby(socket.id, request.sender_id)
                .then(() => leaveLobby(request.target_socket_id, request.target_id))
                .then(() => {
                    io.emit(LOBBY_SOCKET_CHANNEL.ENTRY_REMOVED, request.sender_id)
                    io.emit(LOBBY_SOCKET_CHANNEL.ENTRY_REMOVED, request.target_id)
                    io.to(socket.id).emit(LFG_SOCKET_CHANNEL.USER_LEFT_LOBBY)
                    io.to(request.target_socket_id).emit(LFG_SOCKET_CHANNEL.USER_LEFT_LOBBY)
                })
            
            //remove game request that was accepted
            io.to(request.target_socket_id).emit(
                GAME_REQUEST_SOCKET_CHANNEL.REMOVE_GAME_REQUEST_IN,
                request.id
            )
            io.to(request.sender_socket_id).emit(
                GAME_REQUEST_SOCKET_CHANNEL.REMOVE_GAME_REQUEST_OUT,
                request.id
            )
          
        }
    )
}
