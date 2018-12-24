import * as React from "react";
import { Link } from "react-router-dom"
import { AuthState } from "./auth.interface";
import {connect} from "react-redux"
import {logout} from "./auth.actions"


interface AuthNavProps {
    auth: AuthState;
    logout() : void;
}

const AuthNav : React.SFC<AuthNavProps> = (props) => (
    <div className="flex">
        {props.auth.isAuthenticated ?
            <div className="flex">
                <Link to="/" onClick={props.logout}>
                    <button className="btn btn--purple">
                        Logout
                    </button>
                </Link>
                <p className="page-title text-white">&nbsp;{"- "}{props.auth.user.user_name}</p >
            </div> : 
            <React.Fragment>
                <Link to="/login">
                    <button className="btn btn--purple">Login</button>
                </Link>
                <Link to="/register">
                    <button className="btn btn--green">Register</button>
                </Link>
            </React.Fragment>
        }
    </div>
)

const mapStateToProps = ({
    auth
}) => ({
    auth
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthNav)