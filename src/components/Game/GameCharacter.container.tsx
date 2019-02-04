import {connect} from "react-redux"
import GameCharacter, { GameCharacterProps } from "./GameCharacter.component"

const mapStateToProps = ({userTeam, socket}) => ({
    character: userTeam.find(character => character.isActive),
    socket
})


export default connect(mapStateToProps)(GameCharacter)