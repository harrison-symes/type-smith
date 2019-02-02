import {connect} from "react-redux"
import GameCharacter, { GameCharacterProps } from "./GameCharacter.component"

const mapStateToProps = ({userTeam}) => ({
    character: userTeam.find(character => character.isActive)
})


export default connect(mapStateToProps)(GameCharacter)