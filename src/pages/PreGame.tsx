import * as React from "react"
import {connect} from "react-redux"
import TeamPreview from "../components/TeamPreview/TeamPreview.container";
import { Socket } from "socket.io";
import { GameState } from "../components/GameScreen/game.interface";
import { AuthState } from "../components/Auth/auth.interface";

interface PreGameProps {
    socket: Socket,
    gameInfo: GameState;
    auth: AuthState
}

class PreGame extends React.Component<PreGameProps> {
    render() {
        return (
            <div>
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