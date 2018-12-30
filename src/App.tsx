import * as React from "react";
import {connect} from "react-redux"
import { HashRouter as Router, Route } from "react-router-dom"

import { AuthState } from "./components/Auth/auth.interface";

import Welcome from "./pages/Welcome";
import Lobby from "./pages/Lobby"


import "./sass/main.scss"
import { GameState, GameStage } from "./components/GameScreen/game.interface";
import Game from "./pages/Game";
import PreGame from "./pages/PreGame";
import SocketListener from "./SocketListener.container";

interface AppProps {
    auth: AuthState,
    gameInfo: GameState
}

const App : React.SFC<AppProps> = (props) => (
    <Router>
        <React.Fragment>
            <SocketListener />
            {
                !props.auth.isAuthenticated ? 
                <Route path="/" component={Welcome} /> :
                <Route path="/" render={routeProps => {
                    switch(props.gameInfo.gameStage) {
                        case GameStage.GAME_STARTED: return <Game />
                        case GameStage.PRE_GAME: return <PreGame />
                        default: return <Lobby />
                    }
                }} />
            }
        </React.Fragment>
    </Router>
)

const mapStateToProps = ({
    auth,
    gameInfo
}) => ({
    auth,
    gameInfo
})

export default connect(mapStateToProps)(App)
