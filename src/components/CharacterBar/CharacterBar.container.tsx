import {connect} from "react-redux"
import CharacterBar from "./CharacterBar.component"

const mapStateToProps = ({
    userTeam,
    gameInfo,
    socket,
    opponentTeam
}) => ({
    gameInfo,
    socket,
    character: userTeam.find(character => character.isActive),
    opponent: opponentTeam.find(character => character.isActive)
})

export default connect(mapStateToProps)(CharacterBar)