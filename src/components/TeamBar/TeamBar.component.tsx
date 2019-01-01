import * as React from "react"
import { Character, CharacterClassList } from "../../interfacing/characters";
import { GAME_ACTION_SOCKET_CHANNEL } from "../../../shared/socketChannels";
import { GameState, TurnStage } from "../GameScreen/game.interface";
import { Socket } from "socket.io";
import { ATTACK_TYPES } from "../../../shared/types";
import { ATTACK_STACK_TYPES, GAME_ATTACKS } from "../../../shared/attacks";

interface TeamBarProps {
    isPlayerSide: boolean;
    gameInfo: GameState;
    userTeam: Character[];
    opponentTeam: Character[];
    socket: Socket;
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
    renderCharacter = (character:Character) => {
        const {gameInfo, isPlayerSide} = this.props
        const isWaiting = gameInfo.turnStage != TurnStage.CHOOSING

        const isDisabled = isWaiting 

        return (
            <div className="team-member">
                <p className="team-member--name">
                    {character.characterClass}
                </p>
                <img className="team-member--image" src={images[character.characterClass]} />
                {isPlayerSide &&
                    <button 
                        className="btn" 
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
                    .filter(({isActive}) => !isActive)
                    .map(character => this.renderCharacter(character))
                }
            </div>
        )
    }
}


export default TeamBar