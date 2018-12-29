import { connect } from "react-redux";

import List from "./List.component"
import { getLobby } from "./lobby.api";

const mapStateToProps = ({
    socket,
    auth,
    lobby
}) => ({
    socket,
    auth,
    lobby
})

const mapDispatchToProps = (dispatch) => ({
    getLobby: () => dispatch(getLobby()),
    
})

export default connect(mapStateToProps, mapDispatchToProps)(List)