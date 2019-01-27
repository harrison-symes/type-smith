import * as React from "react"
import { Character, CharacterClassList } from "../../../shared/characters";
import HealthBar from "../statComponents/HealthBar";
import EnergyBar from "../statComponents/EnergyBar";
import UltimateBar from "../statComponents/UltimateBar";
import { Tooltip } from "react-tippy";

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
    [CharacterClassList.SNIPER]: "https://i.pinimg.com/originals/9a/da/65/9ada651d81dc593df9790bee4bab4433.jpg"
}

const passives = {
    [CharacterClassList.WARRIOR]: "The Warriors attacks have their power increased by 1% for each point of health the Warrior is missing",
    [CharacterClassList.MAGE]: "The Mage gains +1 Power at the end of each turn while Active.",
    [CharacterClassList.ASSASSIN]: "The Assassin has +6 Priority when switching",
    [CharacterClassList.PALADIN]: "The Paladin restores 1 Health to itself at the end of each turn while Active.",
    [CharacterClassList.WITCH]: "All of the Witch's attacks also lower the opponent's Defense by 1",
    [CharacterClassList.SNIPER]: "The Sniper gains +1 bonus Energy at the end of each turn, no matter where they are."
}


const icons = {
    [CharacterClassList.WARRIOR]: "ra-crossed-swords",
    [CharacterClassList.MAGE]: "ra-wizard-face",
    [CharacterClassList.ASSASSIN]: "ra-cowled",
    [CharacterClassList.PALADIN]: "ra-elf-helmet",
    [CharacterClassList.WITCH]: "ra-witch-face",
    [CharacterClassList.SNIPER]: "ra-eye-target",
}

class GameCharacter extends React.Component<GameCharacterProps> {
    renderPassiveIcon (character) {
        console.log(passives, character.characterClass)
        return (
            <Tooltip
                position="top"
                trigger="mouseenter"
                animation="perspective"
                // followCursor
                inertia
                arrow="true"
                html={<span>
                    {passives[character.characterClass]}
                </span>}
                style={{ cursor: 'context-menu' }}
            >
                <span className={`ra ra-lg ${
                    icons[character.characterClass]
                }`} />
            </Tooltip>
        )
    }
    render() {
        const {isPlayerSide, character} = this.props
        if (!character) return <div className="mt2 mb2 game-character--container"></div>
        return (
            <div className={`mt2 mb2 game-character--container ${
                    !isPlayerSide && "flex-reverse"
                }`}>
                <div className="game-character--portrait-container">
                    <img className="game-character--portrait" src={images[character.characterClass]} />
                </div>
                <div className="game-character--stats">
                    <text className="page-title center">
                        {character.characterClass}
                        {" "}
                        {this.renderPassiveIcon(character)}
                    </text>
                    
                    <HealthBar character={character} />
                    <EnergyBar character={character} />
                    <UltimateBar character={character} />

                    <div className="flex character-stats" >
                        <div className="page-title">
                            <span className="ra ra-lg ra-strong" />
                            {" "}
                            {character.power}
                        </div>
                        <div className="page-title">
                            <span className="ra ra-lg ra-vibrating-shield" />
                            {" "}
                            {character.defense}
                        </div>
                        <div className="page-title">
                            <span className="ra ra-lg ra-electric" />
                            {" "}
                            {character.speed}
                        </div>
                        {character.isSpiked && <div className="page-title">
                            <span className="ra ra-lg ra-caltrops" />
                            {" "}
                            Spiked
                        </div>}

                    </div>
                </div>
            </div>
        )
    }
}

export default GameCharacter
