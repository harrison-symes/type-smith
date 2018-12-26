import * as React from "react"
import { connect } from "react-redux"
import CharacterBar from "../components/CharacterBar/CharacterBar.container";
import GameLog from "../components/GameLog/GameLog.container";
import GameScreen from "../components/GameScreen/GameScreen.container";

interface GameProps {

}

class Game extends React.Component<GameProps> {
    render() {

        return (
            <div>
                <CharacterBar />
                <GameScreen />
                <CharacterBar />
                <GameLog />
            </div>
        )
    }
}

export default connect()(Game)
