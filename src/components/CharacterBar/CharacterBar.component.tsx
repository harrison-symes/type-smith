import * as React from "react"
import { CharacterAbility, Character } from "../../interfacing/characters";
import { Socket } from "socket.io";
import { GameState, TurnStage } from "../GameScreen/game.interface";
import { GAME_ACTION_SOCKET_CHANNEL } from "../../../shared/socketChannels";

export interface CharacterBarProps {
    socket: Socket;
    gameInfo: GameState;
    character: Character;
    opponent: Character;
}

class CharacterBar extends React.Component<CharacterBarProps> {
    submitAction = (ability) => {
        const {gameInfo, socket, character, opponent} = this.props

        socket.emit(
            GAME_ACTION_SOCKET_CHANNEL.SUBMIT_TURN_ACTION,
            gameInfo.roomId,
            gameInfo.user_id,
            {   
                character,
                opponent,
                ability
            }
        )
    }
    renderAbility = (ability: CharacterAbility) => (
        <button 
            className="btn w-25" 
            onClick={() => this.submitAction(ability)}
            disabled={this.props.gameInfo.turnStage != TurnStage.CHOOSING}
        >
            {ability.name}
        </button>
    )
    render() {
        const {character} = this.props

        return (
            <div className="character-bar">
                {character.abilities.map(this.renderAbility)}
            </div>
        )
    }
}

export default CharacterBar