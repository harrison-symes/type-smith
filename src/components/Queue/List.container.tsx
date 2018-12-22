import { connect } from "react-redux";

import List from "./List.component"
import { addEntryToQueue } from "./queue.actions";
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
    playerJoinedQueue: entry => dispatch(addEntryToQueue(entry))
})

export default connect(mapStateToProps, mapDispatchToProps)(List)