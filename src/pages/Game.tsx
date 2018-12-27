import * as React from "react"
import { connect } from "react-redux"
import CharacterBar from "../components/CharacterBar/CharacterBar.container";
import GameLog from "../components/GameLog/GameLog.container";
import GameScreen from "../components/GameScreen/GameScreen.container";
import TeamBar from "../components/TeamBar/TeamBar.component";
import { Character } from "../components/GameScreen/opponentTeam.reducer";

interface GameProps {
    userTeam: Character[];
    opponentTeam: Character[];
}

class Game extends React.Component<GameProps> {
    render() {
        const {userTeam, opponentTeam} = this.props
        console.log(this.props)
        return (
            <div>
                <TeamBar isPlayerSide={false} team={opponentTeam} />
                <GameScreen />
                <CharacterBar />
                <TeamBar isPlayerSide={true} team={userTeam} />
                <GameLog />
            </div>
        )
    }
}

const mapStateToProps = ({
    userTeam,
    opponentTeam
}) => ({
    userTeam,
    opponentTeam
})

export default connect(mapStateToProps)(Game)
