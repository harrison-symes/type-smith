import {connect} from "react-redux";
import Join from "./Join.component";
import { getQueue } from "./queue.api";
import { joinQueue, queueJoined, userLeftQueue, ownUserLeftQueue } from "./queue.actions";

const mapStateToProps = ({
    socket,
    queue,
    auth
}) => ({
    socket,
    queue,
    auth
})

const mapDispatchToProps = dispatch => ({
    getQueue: () => dispatch(getQueue()),
    userJoinedQueue: () => dispatch(queueJoined()),
    userLeftQueue: (id) => dispatch(userLeftQueue(id)),
    ownUserLeftQueue: () => dispatch(ownUserLeftQueue())
})

export default connect(mapStateToProps, mapDispatchToProps)(Join)