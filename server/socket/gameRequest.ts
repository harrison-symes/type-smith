import { GAME_REQUEST_SOCKET_CHANNEL } from "../../src/components/GameRequests/GameRequests.socket";

let idCounter = 1;

export const gameRequests = (io, socket) => {
    io.on(
        GAME_REQUEST_SOCKET_CHANNEL.SEND_GAME_REQUEST,
        request => {
            console.log({request});
            
            request["id"] = ++idCounter;
            io.to(socket.id).emit(
                GAME_REQUEST_SOCKET_CHANNEL.SENT_GAME_REQUEST,
                request
            )
            io.to(request.target_socket_id).emit(
                GAME_REQUEST_SOCKET_CHANNEL.RECEIVE_GAME_REQUEST,
                request
            )
        }
    )
}
