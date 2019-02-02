import * as React from "react";
import {connect} from "react-redux"
import { HashRouter as Router, Route } from "react-router-dom"

import { AuthState } from "./components/Auth/auth.interface";

import Game from "./pages/Game"

import "./sass/main.scss"
import { GameState, GameStage } from "./components/GameScreen/game.interface";
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
                <Route path="/" render={() => {
                    const Welcome = React.lazy(()=>import("./pages/Welcome"))
                    return <React.Suspense fallback={"loading"}>
                        <Welcome />
                    </React.Suspense>
                }} /> :
                <React.Fragment>
                    <Route path="/" render={(_routeProps) => {
                        switch(props.gameInfo.gameStage) {
                            case GameStage.GAME_STARTED:
                                return <Game /> 
                            case GameStage.PRE_GAME:
                                const PreGame = React.lazy(() => import('./pages/PreGame')) 
                                return <React.Suspense fallback={"loading"}>
                                    <PreGame />
                                </React.Suspense>    
                            default: 
                                const Main = React.lazy(() => import('./pages/Main')) 
                                return <React.Suspense fallback={"loading"}>
                                    <Main />
                                </React.Suspense>
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

// export default connect(mapStateToProps)(Game)
export default connect(mapStateToProps)(App)
