import * as React from "react";
import { Link } from "react-router-dom"
import { AuthState } from "./auth.interface";
import {connect} from "react-redux"
import {logout} from "./auth.actions"


interface AuthNavProps {
    auth: AuthState;
}

const AuthNav : React.SFC<AuthNavProps> = (props) => (
    (props.auth.isAuthenticated && props.auth.user) ?
        <p className="">
            {props.auth.user.user_name}
        </p> : 
        <Link to="/">
            <button className="btn btn--purple">Sign In</button>
        </Link>
)

const mapStateToProps = ({
    auth
}) => ({
    auth
})

export default connect(mapStateToProps)(AuthNav)