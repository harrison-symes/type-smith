import {connect} from "react-redux"
import MobileNav from "./MobileNav.component"
import {withRouter} from "react-router-dom"
import { logout } from "../Auth/auth.actions";

const mapStateToProps = ({
    socket
}) => ({
    socket
})

export default 
    connect(mapStateToProps)(MobileNav) as any
