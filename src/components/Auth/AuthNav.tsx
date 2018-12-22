import * as React from "react";
import { Link } from "react-router-dom"

const AuthNav : React.SFC<{}> = () => (
    <div>
        <Link to="/login">
            <button>Login</button>
        </Link>
        <Link to="/register">
            <button>Register</button>
        </Link>
    </div>
)

export default AuthNav