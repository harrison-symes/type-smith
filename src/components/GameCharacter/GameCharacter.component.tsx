import * as React from "react"
import { Character, CharacterClassList } from "../../../src/interfacing/characters";
import HealthBar from "../statComponents/HealthBar";
import EnergyBar from "../statComponents/EnergyBar";
import UltimateBar from "../statComponents/UltimateBar";

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
            <div className={`mt2 mb2 game-character--container ${
                    !isPlayerSide && "flex-reverse"
                }`}>
                <div className="game-character--portrait-container">
                    <img className="game-character--portrait" src={images[character.characterClass]} />
                </div>
                <div className="game-character--stats pt3">
                    
                    <HealthBar character={character} />
                    <EnergyBar character={character} />
                    <UltimateBar character={character} />
                    <table>
                        <tr>
                            <th>{character.characterClass}</th>
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
