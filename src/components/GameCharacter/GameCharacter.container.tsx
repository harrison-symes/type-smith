import {connect} from "react-redux"
import GameCharacter, { GameCharacterProps } from "./GameCharacter.component"

const mapStateToProps = (state, ownProps: Partial<GameCharacterProps>) => ({
    character: state[
        ownProps.isPlayerSide ? "userTeam" : "opponentTeam"
    ].find(character => character.isActive)
})


export default connect(mapStateToProps)(GameCharacter)