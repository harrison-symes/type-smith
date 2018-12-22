import * as React from "react";
import { connect } from "react-redux";
import Queue from "../components/Queue/Queue.container"

interface LobbyProps {
    socket: SocketIOClientStatic;
}

class Lobby extends React.Component<LobbyProps> {
    constructor(props){
        super(props)
    }
    render() {

        return (
            <div className="center w-50">   
                <h2 className="page-title">Lobby</h2>
                <Queue />
            </div>
        )
    }
}


export default connect()(Lobby)