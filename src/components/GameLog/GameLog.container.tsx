import GameLog from "./GameLog.component"
import {connect} from "react-redux"

const mapStateToProps = ({
    gameLog
}) => ({
    gameLog
})

export default connect(mapStateToProps)(GameLog)