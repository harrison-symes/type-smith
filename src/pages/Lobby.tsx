import * as React from "react";
import { connect } from "react-redux";
import Join from "../components/Queue/Join.container"
import List from "../components/Queue/List.container";
import NavBar from "../components/NavBar/NavBar.component";

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
                <div className="center w-50">   
                    <h2 className="page-title">Lobby</h2>
                    <Join />
                    <List />
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(Lobby)