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
import Main from "./pages/Main";
import SocketListener from "./SocketListener.container";
import MobileNav from "./components/MobileNav/MobileNav.container";

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
                <React.Fragment>
                    <Route path="/" render={_routeProps => {
                        switch(props.gameInfo.gameStage) {
                            case GameStage.GAME_STARTED: return <Game />
                            case GameStage.PRE_GAME: return <PreGame />
                            default: return <Main />
                        }
                    }} />
                </React.Fragment>
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

export default connect(mapStateToProps)(Game)
// export default connect(mapStateToProps)(App)
