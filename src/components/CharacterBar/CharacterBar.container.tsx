import {connect} from "react-redux"
import CharacterBar from "./CharacterBar.component"

const mapStateToProps = ({
    userTeam
}) => ({
    character: userTeam.find(character => character.isActive)
})

export default connect(mapStateToProps)(CharacterBar)