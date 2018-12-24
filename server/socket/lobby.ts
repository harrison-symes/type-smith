import * as lobbyDb from "../db/lobby"
import { Socket } from "socket.io";
import { LOBBY_SOCKET_CHANNEL } from "../../src/components/Lobby/lobby.socket";
import { LFG_SOCKET_CHANNEL } from "../../src/components/LFG/LFG.socket";

export const joinGame = (socket, room) => {
    socket.join(room)
}

export const joinLobby = (socket : Socket, io) => {
    socket.on(
        LFG_SOCKET_CHANNEL.USER_JOIN_LOBBY, 
        async (user_id) => {

            const entry = await lobbyDb.joinLobby(socket.id, user_id)
            
            io.emit(LOBBY_SOCKET_CHANNEL.ENTRY_ADDED, entry)
            io.to(socket.id).emit(LFG_SOCKET_CHANNEL.USER_JOINED_LOBBY)
            
            socket.addListener("disconnect", async () => {
                const leaveRes = await lobbyDb.leaveLobby(socket.id, user_id)
                io.emit(LFG_SOCKET_CHANNEL.USER_LEFT_LOBBY, user_id)
            })

        }
    )
}

export const leaveLobby = (socket : Socket, io) => {
    socket.on(LFG_SOCKET_CHANNEL.USER_LEAVE_LOBBY, async user_id => {
        try {
            const success = await lobbyDb.leaveLobby(socket.id, user_id)
            if (success !== null) {
                io.emit(LOBBY_SOCKET_CHANNEL.ENTRY_REMOVED, user_id)
                io.to(socket.id).emit(LFG_SOCKET_CHANNEL.USER_LEFT_LOBBY)
            }
        }
        catch (e) {
            console.log(e)
        }
    })
}