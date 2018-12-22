import * as React from "react"
import { NavBarProps } from "./interface";
import AuthNav from "../Auth/AuthNav";
import { Link } from "react-router-dom";
import { isString } from "util";

const NavBar : React.SFC<{}> = () => (
    <div id="myHeader" className="navbar">
        <div className="navbar__container">
            <Link to="/" className="navbar__title">
                Type Smith
            </Link>
            <div className="navbar__right">
                <AuthNav />
            </div>
        </div>
    </div>

)

export default NavBar