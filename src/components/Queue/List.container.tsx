import { connect } from "react-redux";

import List from "./List.component"
import { addEntryToQueue, addPlayerEntryToQueue } from "./queue.actions";
import { getQueue } from "./queue.api";

const mapStateToProps = ({
    socket,
    auth,
    queue
}) => ({
    socket,
    auth,
    queue
})

const mapDispatchToProps = dispatch => ({
    getQueue: () => dispatch(getQueue()),
    playerJoinedQueue: entry => dispatch(addPlayerEntryToQueue(entry)),
    addEntryToQueue: entry => dispatch(addEntryToQueue(entry))
})

export default connect(mapStateToProps, mapDispatchToProps)(List)