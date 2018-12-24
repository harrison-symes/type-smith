import { GAME_REQUEST_SOCKET_CHANNEL } from "../../src/components/GameRequests/GameRequests.socket";

let idCounter = 1;

export const gameRequests = (socket, io) => {
    socket.on(
        GAME_REQUEST_SOCKET_CHANNEL.SEND_GAME_REQUEST,
        request => {
            console.log({request});
            
            request["id"] = ++idCounter;
            request["sender_socket_id"] = socket.id;
            console.log("after", {request});
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
}
