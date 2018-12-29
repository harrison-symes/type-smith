import * as React from "react"
import {connect} from "react-redux"
import TeamPreview from "../components/TeamPreview/TeamPreview.container";
import { Socket } from "socket.io";
import { GameState } from "../components/GameScreen/game.interface";
import { GAME_SOCKET_CHANNEL } from "../components/GameScreen/game.socket";
import { AuthState } from "../components/Auth/auth.interface";
import { receiveTeamInfo } from "../components/GameScreen/gameScreen.actions";

interface PreGameProps {
    socket: Socket,
    gameInfo: GameState;
    auth: AuthState
}

class PreGame extends React.Component<PreGameProps> {
    render() {
        return (
            <div>
                <h1>Pre Game</h1>
                <TeamPreview />
            </div>
        )
    }
}

const mapStateToProps = ({
    socket,
    gameInfo,
    auth
}) => ({
    socket,
    gameInfo,
    auth
})

export default connect(mapStateToProps)(PreGame)