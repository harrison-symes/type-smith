import * as React from "react";
import { Socket } from "socket.io";
import Entry from "./Entry.container";

import { LOBBY_SOCKET_CHANNEL } from "./lobby.socket";
import { LobbyState, QueueEntry } from "./interface";
import { AuthState } from "../Auth/auth.interface";

interface ListProps {
    socket: Socket;
    auth: AuthState;
    lobby: LobbyState;
    getLobby(): void;
    addEntryToLobby(entry : QueueEntry) : void;
    removeEntryFromLobby(user_id: number) : void;
}

class List extends React.Component<ListProps> {
    componentDidMount = () => {
        const {getLobby} = this.props
        
        getLobby()
        this.socketsListen()
    }
    socketsListen = () => {
        const {socket, addEntryToLobby, removeEntryFromLobby} = this.props

        socket.on(
            LOBBY_SOCKET_CHANNEL.ENTRY_ADDED, 
            entry => addEntryToLobby(entry)
        )
        socket.on(
            LOBBY_SOCKET_CHANNEL.ENTRY_REMOVED,
            user_id => removeEntryFromLobby(user_id)
        )

    }
    render = () => {
        const {lobby, auth} = this.props
        
        return (
            <div className="flex flex-wrap ">
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