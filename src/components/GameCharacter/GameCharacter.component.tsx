import * as React from "react"
import { Character } from "src/interfacing/characters";

export interface GameCharacterProps {
    character: Character;
    isPlayerSide: boolean;
}

class GameCharacter extends React.Component<GameCharacterProps> {

    render() {
        const {isPlayerSide, character} = this.props

        return (
            <div className={`game-character--container ${
                    !isPlayerSide && "flex-reverse"
                }`}>
                <div className="game-character--portrait-container">
                    <img className="game-character--portrait" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1eT_cT2zIf1_X1jh8dUbm-QSoWq8VJP37MtKqq0rhv_iWFwcc"} />
                </div>
                <div className="game-character--stats">
                    <table>
                        <tr>
                            <th>Health</th>
                            <td>{character.health} / {character.healthMax}</td>
                        </tr>
                        <tr>
                            <th>Energy</th>
                            <td>{character.energy} / {character.energyMax}</td>
                        </tr>
                        <tr>
                            <th>Power</th>
                            <td>{character.power}</td>
                        </tr>
                        <tr>
                            <th>Defense</th>
                            <td>{character.defense}</td>
                        </tr>
                        <tr>
                            <th>Speed</th>
                            <td>{character.speed}</td>
                        </tr>

                    </table>
                </div>
            </div>
        )
    }
}

export default GameCharacter
