import * as React from "react"

export interface GameCharacterProps {
    isPlayerSide: boolean;
}

class GameCharacter extends React.Component<GameCharacterProps> {

    render() {
        const {isPlayerSide} = this.props

        return (
            <div className={`game-character--container ${
                    !isPlayerSide && "flex-reverse"
                }`}>
                <div className="game-character--portrait-container">
                    <img className="game-character--portrait" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1eT_cT2zIf1_X1jh8dUbm-QSoWq8VJP37MtKqq0rhv_iWFwcc"} />
                </div>
                <div className="game-character--stats">
                    Stats here
                </div>
            </div>
        )
    }
}

export default GameCharacter
