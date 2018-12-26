import * as React from "react";
import {connect} from "react-redux"
import { HashRouter as Router, Route } from "react-router-dom"

import { AuthState } from "./components/Auth/auth.interface";

import Welcome from "./pages/Welcome";
import Lobby from "./pages/Lobby"


import "./sass/main.scss"
import { GameState } from "./components/GameScreen/game.interface";
import Game from "./pages/Game";

interface AppProps {
    auth: AuthState,
    gameInfo: GameState
}

const App : React.SFC<AppProps> = (props) => (
    <Router>
        <React.Fragment>
            {
                !props.auth.isAuthenticated ? 
                <Route path="/" component={Welcome} /> :
                <Route path="/" render={routeProps => {
                    console.log(props.gameInfo)
                    if (props.gameInfo.gameReady || props.gameInfo.gameStarted) {
                        return <Game />
                    }

                    return <Lobby />
                    
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
