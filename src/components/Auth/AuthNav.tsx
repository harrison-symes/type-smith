import * as React from "react";
import { Link } from "react-router-dom"

const AuthNav : React.SFC<{}> = () => (
    <div className="flex">
        <Link to="/login">
            <button className="btn btn--purple">Login</button>
        </Link>
        <Link to="/register">
            <button className="btn btn--green">Register</button>
        </Link>
    </div>
)

export default AuthNav