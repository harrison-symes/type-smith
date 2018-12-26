import * as React from "react";
import { Socket } from "socket.io";
import Entry from "./Entry.container";

import { LOBBY_SOCKET_CHANNEL } from "./lobby.socket";
import { LobbyState, LobbyEntry } from "./interface";
import { AuthState } from "../Auth/auth.interface";
import { GAME_SOCKET_CHANNEL } from "../GameScreen/game.socket";
import { GameState } from "../GameScreen/game.interface";

interface ListProps {
    socket: Socket;
    auth: AuthState;
    lobby: LobbyState;
    getLobby(): void;
    addEntryToLobby(entry : LobbyEntry) : void;
    removeEntryFromLobby(user_id: number) : void;
    receiveGameInfo(gameInfo: GameState) : void;
}

class List extends React.Component<ListProps> {
    componentDidMount = () => {
        const {getLobby} = this.props
        
        getLobby()
        this.socketsListen()
    }
    socketsListen = () => {
        const {socket, addEntryToLobby, removeEntryFromLobby, receiveGameInfo} = this.props

        socket.on(
            LOBBY_SOCKET_CHANNEL.ENTRY_ADDED, 
            entry => addEntryToLobby(entry)
        )
        socket.on(
            LOBBY_SOCKET_CHANNEL.ENTRY_REMOVED,
            user_id => removeEntryFromLobby(user_id)
        )

        socket.on(
            LOBBY_SOCKET_CHANNEL.SIGNAL_JOIN_ROOM,
            (roomId, request) => {
                console.log({roomId})
                socket.emit(
                    LOBBY_SOCKET_CHANNEL.JOIN_ROOM,
                    roomId,
                    request
                )
            }
        )

        socket.on(
            GAME_SOCKET_CHANNEL.READY_GAME,
            gameInfo => {
                console.log({gameInfo})
                receiveGameInfo(gameInfo)
            }
        )

    }
    render = () => {
        const {lobby, auth} = this.props
        console.log({lobby, auth})
        return (
            <div className="flex flex-wrap justify-center">
                {lobby.map(entry => (
                    <Entry 
                        key={entry.id} 
                        entry={entry} 
                    />
                ))}
            </div>
        )
    }
}

export default List