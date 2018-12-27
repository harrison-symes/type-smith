import * as React from "react"

export interface CharacterBarProps {
    
}

const attacks = [
    {
        name: "attack 1"
    },
    {
        name: "attack 2"
    },
    {
        name: "attack 3"
    },
    {
        name: "attack 4"
    }
]

class CharacterBar extends React.Component<CharacterBarProps>{

    render() {

        return (
            <div className="character-bar">
                {attacks.map(attack => (
                    <button className="btn w-25">
                        {attack.name}
                    </button>
                ))}
            </div>
        )
    }
}

export default CharacterBar