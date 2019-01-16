import * as React from "react"
import { connect } from "react-redux"
import TeamPreview from "../components/TeamPreview/TeamPreview.container";
import { Socket } from "socket.io";
import { GameState } from "../components/GameScreen/game.interface";
import { AuthState } from "../components/Auth/auth.interface";
import { HashRouter as Router, Route } from "react-router-dom";
import { Character, CharacterClassList } from "../interfacing/characters";

export interface CharacterPreviewProps {
    socket: Socket,
    gameInfo: GameState,
    auth: AuthState,
}

interface CharacterPreviewState {
    selectedTeam: Partial<Character>[],
    activeCharacter: Partial<Character>,
}

class CharacterPreview extends React.Component<CharacterPreviewProps, CharacterPreviewState> {
    render() {
        return (
           <div className="nav-helper">
               Character Preview
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

export default connect(mapStateToProps)(CharacterPreview)