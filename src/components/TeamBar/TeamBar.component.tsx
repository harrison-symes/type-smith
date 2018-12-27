import * as React from "react"
import { Character } from "../GameScreen/opponentTeam.reducer";

interface TeamBarProps {
    isPlayerSide: boolean;
    team: Character[]
}

const team = [
    {
        name: "Warrior"
    },
    {
        name: "Mage"
    },
    {
        name: "Assassin"
    },
    {
        name: "Warden"
    },
]

class TeamBar extends React.Component<TeamBarProps> {
    render() {
        return (
            <div className="team-bar width-100">
                {team.map(character => (
                    <div className="team-member">
                        {character.name}
                    </div>
                ))}
            </div>
        )
    }
}


export default TeamBar