import * as React from "react"
import { Socket } from "socket.io";
import { TEAM_PREVIEW_SOCKET_CHANNEL } from "./teamPreview.socket";
import { GameState } from "../GameScreen/game.interface";
import { CharacterClassList, Character } from "../../interfacing/characters";

export interface TeamPreviewProps {
    socket: Socket,
    gameInfo: GameState
}

const defaultTeam = [
    {
        characterClass: CharacterClassList.WARRIOR,
        isActive: true
    },
    {
        characterClass: CharacterClassList.MAGE,
    },
    {
        characterClass: CharacterClassList.ASSASSIN,
    },
    {
        characterClass: CharacterClassList.PALADIN,
    },
    {
        characterClass: CharacterClassList.WITCH,
    },
] as Partial<Character>[]

class TeamPreview extends React.Component<TeamPreviewProps> {
    submitTeam = () => {
        const {socket, gameInfo} = this.props

        socket.emit(
            TEAM_PREVIEW_SOCKET_CHANNEL.SUBMIT_TEAM,
            gameInfo.roomId,
            gameInfo.user_id,
            defaultTeam
        )
    }
    render() {
        return (
            <div className="center w-70">
                <h1 className="page-title">Team Preview</h1>

                <p>THIS GAME IS IN ALPHA! YOU MAY CURRENTLY ONLY BATTLE WITH A DEFAULT TEAM</p>
                <button onClick={this.submitTeam} className="btn btn--green w-50 hpx-200">SUBMIT TEAM</button>
            </div>
        )
    }
}

export default TeamPreview