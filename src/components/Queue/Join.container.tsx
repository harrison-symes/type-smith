import {connect} from "react-redux";
import Join from "./Join.component";
import { getQueue } from "./queue.api";
import { joinQueue, queueJoined, userLeftQueue } from "./queue.actions";

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
    userLeftQueue: (id) => dispatch(userLeftQueue(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Join)