import * as React from "react"
import { Socket } from "socket.io";
import { GameState } from "../GameScreen/game.interface";
import { CharacterClassList, Character } from "../../interfacing/characters";
import { GAME_ATTACKS } from "../../../shared/attacks";
import { TEAM_PREVIEW_SOCKET_CHANNEL } from "../../../shared/socketChannels";

export interface TeamPreviewProps {
    socket: Socket,
    gameInfo: GameState
}

const defaultMoves = () => ([
    {name: GAME_ATTACKS.SLASH },
    {name: GAME_ATTACKS.ACCELERATE },
    {name: GAME_ATTACKS.RECUPERATE },
    {name: GAME_ATTACKS.TANK_UP }
])

const defaultTeam = [
    {
        characterClass: CharacterClassList.WARRIOR,
        abilities: defaultMoves()
    },
    {
        characterClass: CharacterClassList.MAGE,
        abilities: defaultMoves()
    },
    {
        characterClass: CharacterClassList.ASSASSIN,
        abilities: defaultMoves()
    },
    {
        characterClass: CharacterClassList.PALADIN,
        abilities: defaultMoves()
    },
    {
        characterClass: CharacterClassList.WITCH,
        abilities: defaultMoves()
    },
] as Partial<Character>[]

const idx = Math.floor(Math.random() * defaultTeam.length)
defaultTeam[idx].isActive = true 

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