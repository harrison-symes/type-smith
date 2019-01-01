import * as React from "react"
import { Character, CharacterClassList } from "../../../src/interfacing/characters";

export interface GameCharacterProps {
    character: Character;
    isPlayerSide: boolean;
}

const images = {
    [CharacterClassList.WARRIOR]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSrnnC3vvN68thWmPatN6YJotE84yitAhCgoGMvIDBcxjaU-yJ",
    [CharacterClassList.MAGE]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9jdkxWaz9A9qKZuUx9B30n9Av63UfCnWQW8QAUtJvBdFoH3DVVQ",
    [CharacterClassList.ASSASSIN]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN2ZPdgsilSlMot1Ra_J1wW6k5qExY0CrJAn9YTrUXKGUFjpsJ",
    [CharacterClassList.PALADIN]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO1QoI5qjFzrmcmcZ7E1ZzIzNsyDWoZlk6uOVPETzGyigXTvdR3g",
    [CharacterClassList.WITCH]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPGR81UKtXdiUnJFdpO0T4aQ7DkitpeLvu9qCFmTgajafFTKt4",
}

class GameCharacter extends React.Component<GameCharacterProps> {

    render() {
        const {isPlayerSide, character} = this.props

        return (
            <div className={`game-character--container ${
                    !isPlayerSide && "flex-reverse"
                }`}>
                <div className="game-character--portrait-container">
                    <img className="game-character--portrait" src={images[character.characterClass]} />
                </div>
                <div className="game-character--stats">
                    <table>
                        <tr>
                            <th>{character.characterClass}</th>
                            <td>{character.id}</td>
                        </tr>
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
