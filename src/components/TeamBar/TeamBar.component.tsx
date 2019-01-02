import * as React from "react"
import { Character, CharacterClassList } from "../../interfacing/characters";
import { GAME_ACTION_SOCKET_CHANNEL } from "../../../shared/socketChannels";
import { GameState, TurnStage } from "../GameScreen/game.interface";
import { Socket } from "socket.io";
import { ATTACK_TYPES } from "../../../shared/types";
import { ATTACK_STACK_TYPES, GAME_ATTACKS } from "../../../shared/attacks";
import HealthBar from "../statComponents/HealthBar";
import { Transition, TransitionGroup } from "react-transition-group";

import posed from "react-pose"
import { tween, spring } from "popmotion";
import EnergyBar from "../statComponents/EnergyBar";
import UltimateBar from "../statComponents/UltimateBar";

interface TeamBarProps {
    isPlayerSide: boolean;
    gameInfo: GameState;
    userTeam: Character[];
    opponentTeam: Character[];
    socket: Socket;
}

const icons = {
    [CharacterClassList.WARRIOR]: "ra-crossed-swords",
    [CharacterClassList.MAGE]: "ra-wizard-face",
    [CharacterClassList.ASSASSIN]: "ra-cowled",
    [CharacterClassList.PALADIN]: "ra-elf-helmet",
    [CharacterClassList.WITCH]: "ra-witch-face",
}

const images = {
    [CharacterClassList.WARRIOR]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSrnnC3vvN68thWmPatN6YJotE84yitAhCgoGMvIDBcxjaU-yJ",
    [CharacterClassList.MAGE]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9jdkxWaz9A9qKZuUx9B30n9Av63UfCnWQW8QAUtJvBdFoH3DVVQ",
    [CharacterClassList.ASSASSIN]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN2ZPdgsilSlMot1Ra_J1wW6k5qExY0CrJAn9YTrUXKGUFjpsJ",
    [CharacterClassList.PALADIN]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO1QoI5qjFzrmcmcZ7E1ZzIzNsyDWoZlk6uOVPETzGyigXTvdR3g",
    [CharacterClassList.WITCH]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPGR81UKtXdiUnJFdpO0T4aQ7DkitpeLvu9qCFmTgajafFTKt4",
}

class TeamBar extends React.Component<TeamBarProps> {
    
    switchCharacter = (character) => {
        const {socket, gameInfo, userTeam, opponentTeam} = this.props

        const ability = {
            name: [GAME_ATTACKS.SWITCH],
            cost: 0,
            power: 0,
            descriptiom: "Switch to a different character",
            isUltimate: false,
            type: ATTACK_TYPES.STATUS,
            targetCharacter: character,
            priority: 0,
            stack: [
                //switch out
                ATTACK_STACK_TYPES.SWITCH,
                //opponent Switch Catch
            ]
        }

        if (gameInfo.turnStage == TurnStage.NEED_TO_SWITCH) {
            socket.emit(
                GAME_ACTION_SOCKET_CHANNEL.SUBMIT_REQUIRED_SWITCH,
                gameInfo.roomId,
                gameInfo.user_id,
                {
                    character: userTeam.find(character => character.isActive),
                    opponent: opponentTeam.find(character => character.isActive),
                    ability
                }
            )
        } else {
            socket.emit(
                GAME_ACTION_SOCKET_CHANNEL.SUBMIT_TURN_ACTION,
                gameInfo.roomId,
                gameInfo.user_id,
                {
                    character: userTeam.find(character => character.isActive),
                    opponent: opponentTeam.find(character => character.isActive),
                    ability
                }
            )
        }

    }
    renderCharacter = (character:Character) => {
        const {gameInfo, isPlayerSide, userTeam, opponentTeam} = this.props
        const team = isPlayerSide ? userTeam : opponentTeam
        const active = team.find(character => character.isActive)

        const isWaiting = !(gameInfo.turnStage == TurnStage.CHOOSING 
            || gameInfo.turnStage == TurnStage.NEED_TO_SWITCH)

        const isDisabled = isWaiting || (active.isTrapped && gameInfo.turnStage != TurnStage.NEED_TO_SWITCH)

        return (
            <div 
                className="team-member"
            >
                <p className="team-member--name">
                    {character.characterClass}
                </p>
                <div>
                    <span className={`team-member--image ra ra-lg ${icons[character.characterClass]}`} />
                    <HealthBar character={character} />
                    <EnergyBar character={character} />
                    <UltimateBar character={character} />
                </div>
                {(isPlayerSide && !character.isActive && character.isAlive) &&
                    <button 
                        className="team-member--btn btn" 
                        disabled={isDisabled}
                        onClick={() => this.switchCharacter(character)}>
                        Switch
                    </button>
                }
            </div>
        )
    }
    render() {
        const {userTeam, opponentTeam, isPlayerSide} = this.props
        const team = isPlayerSide ? userTeam : opponentTeam

        return (
            <div className="team-bar width-100">
                {team
                    .map(character => this.renderCharacter(character))
                }
            </div>
        )
    }
}


export default TeamBar