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
}

class List extends React.Component<ListProps> {
    componentDidMount = () => {
        this.props.getLobby()
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