import * as React from "react";
import { connect } from "react-redux";
import LFG from "../components/LFG/LFG.container"
import List from "../components/Lobby/List.container";
import GameRequests from "../components/GameRequests/GameRequests.container";

interface LobbyProps {
}

class Lobby extends React.Component<LobbyProps> {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <React.Fragment>
                <div className="lobby nav-helper">
                    <h2 className="page-title">Lobby</h2>
                    <List />
                </div>
                <GameRequests />
                <LFG />
            </React.Fragment>
        )
    }
}


export default connect()(Lobby)