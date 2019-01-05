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
        abilities: [
            { name: GAME_ATTACKS.DEMOLISH },
            { name: GAME_ATTACKS.SLASH },
            { name: GAME_ATTACKS.RECKLESS_SLAM },
            { name: GAME_ATTACKS.TANK_UP }
        ]
    },
    {
        characterClass: CharacterClassList.MAGE,
        abilities: [
            { name: GAME_ATTACKS.METEOR },
            { name: GAME_ATTACKS.FIREBALL },
            { name: GAME_ATTACKS.MOLTEN_CORE },
            { name: GAME_ATTACKS.FROST_ARMOUR },
        ]
    },
    {
        characterClass: CharacterClassList.ASSASSIN,
        abilities: [
            { name: GAME_ATTACKS.ASSASSINATE },
            { name: GAME_ATTACKS.BACKSTAB },
            { name: GAME_ATTACKS.RECUPERATE },
            { name: GAME_ATTACKS.ACCELERATE }
        ]
    },
    {
        characterClass: CharacterClassList.PALADIN,
        abilities: [
            { name: GAME_ATTACKS.SANCTUARY },
            { name: GAME_ATTACKS.BLESSED_HAMMER },
            { name: GAME_ATTACKS.HOLY_RADIANCE },
            { name: GAME_ATTACKS.INSPIRE },
        ]
    },
    {
        characterClass: CharacterClassList.WITCH,
        abilities: [
            { name: GAME_ATTACKS.WITCHING_HOUR },
            { name: GAME_ATTACKS.BLOOD_MOON },
            { name: GAME_ATTACKS.CURSE },
            { name: GAME_ATTACKS.ENTRAP },
        ]
    },
    // {
    //     characterClass: CharacterClassList.SNIPER,
    //     abilities: [
    //         { name: GAME_ATTACKS.RAPID_FIRE },
    //         { name: GAME_ATTACKS.PIERCING_SHOT },
    //         { name: GAME_ATTACKS.RELOAD },
    //         { name: GAME_ATTACKS.SPIKE_TRAP },
    //     ]
    // },
] as Partial<Character>[]


class TeamPreview extends React.Component<TeamPreviewProps> {
    submitTeam = () => {
        const {socket, gameInfo} = this.props
        
        const idx = Math.floor(Math.random() * defaultTeam.length)
        defaultTeam[idx].isActive = true 
        
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