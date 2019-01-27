import {connect} from "react-redux"
import PreGameMobileNav from "./PreGameMobileNav.component"
import {withRouter} from "react-router-dom"
import { logout } from "../Auth/auth.actions";

const mapStateToProps = ({

}) => ({

})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
})

export default 
    // withRouter(
        connect(mapStateToProps, mapDispatchToProps)(PreGameMobileNav) as any
    // ) 
