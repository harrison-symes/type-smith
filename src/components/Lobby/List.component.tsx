import * as React from "react";
import { Socket } from "socket.io";
import Entry from "./Entry.container";

import { LobbyState, LobbyEntry } from "./interface";
import { AuthState } from "../Auth/auth.interface";

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
            
        return (
            <div className="lobby__content">
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