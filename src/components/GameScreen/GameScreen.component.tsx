import * as React from "react"
import GameCharacter from "../GameCharacter/GameCharacter.container";

class GameScreen extends React.Component<{}> {
    render() {
        return (
            <div>
                <div className="w-100">
                    <GameCharacter isPlayerSide={false} />
                </div>
                <div className="w-100">
                    <GameCharacter isPlayerSide={true} />
                </div>
            </div>
        )
    }
}

export default GameScreen