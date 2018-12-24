import {connect} from "react-redux"
import GameRequests from "./GameRequests.component"

const mapStateToProps = ({
    socket,
    gameRequests
}) => ({
    socket,
    gameRequests
})

const mapDispatchToProps = dispatch => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(GameRequests)