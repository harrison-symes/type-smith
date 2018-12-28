import * as React from "react"
import { Character } from "../../interfacing/characters";

interface TeamBarProps {
    isPlayerSide: boolean;
    team: Character[]
}

class TeamBar extends React.Component<TeamBarProps> {
    render() {
        const {team} = this.props

        return (
            <div className="team-bar width-100">
                {team
                    .filter(({isActive}) => !isActive)
                    .map(character => (
                        <div className="team-member">
                            {character.characterClass}
                        </div>
                    ))
                }
            </div>
        )
    }
}


export default TeamBar