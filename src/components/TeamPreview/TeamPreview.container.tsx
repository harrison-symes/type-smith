import { connect} from "react-redux"
import TeamPreview from "./TeamPreview.component";

const mapStateToProps = ({
    gameInfo,
    socket
}) => ({
    gameInfo,
    socket
})

export default connect(mapStateToProps)(TeamPreview)