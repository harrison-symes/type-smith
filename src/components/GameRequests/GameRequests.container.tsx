import {connect} from "react-redux"
import GameRequests from "./GameRequests.component"
import { receiveGameRequestInbound, receiveGameRequestOutbound, removeGameRequestInbound, removeGameRequestOutbound } from "./GameRequests.actions";

const mapStateToProps = ({
    socket,
    gameRequests
}) => ({
    socket,
    gameRequests
})

const mapDispatchToProps = dispatch => ({
    receiveIncomingGameRequest: request => dispatch(receiveGameRequestInbound(request)),
    receiveOutgoingGameRequest: request => dispatch(receiveGameRequestOutbound(request)),
    removeIncomingGameRequest: request_id => dispatch(removeGameRequestInbound(request_id)),
    removeOutgoingGameRequest: request_id => dispatch(removeGameRequestOutbound(request_id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GameRequests)