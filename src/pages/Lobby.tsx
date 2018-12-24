import * as React from "react";
import { connect } from "react-redux";
import LFG from "../components/LFG/LFG.container"
import List from "../components/Lobby/List.container";
import NavBar from "../components/NavBar/NavBar.component";
import GameRequests from "../components/GameRequests/GameRequests.container";

interface LobbyProps {
    socket: SocketIOClientStatic;
}

class Lobby extends React.Component<LobbyProps> {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className="center w-75">   
                    <h2 className="page-title">Lobby</h2>
                    <GameRequests />
                    <List />
                </div>
                <LFG />
            </React.Fragment>
        )
    }
}


export default connect()(Lobby)