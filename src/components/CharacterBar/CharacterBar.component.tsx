import * as React from "react"
import { CharacterAbility, Character } from "../../interfacing/characters";

export interface CharacterBarProps {
    character: Character
}

class CharacterBar extends React.Component<CharacterBarProps>{
    render() {
        const {character} = this.props

        return (
            <div className="character-bar">
                {character.abilities.map((ability) => (
                    <button className="btn w-25">
                        {ability.name}
                    </button>
                ))}
            </div>
        )
    }
}

export default CharacterBar