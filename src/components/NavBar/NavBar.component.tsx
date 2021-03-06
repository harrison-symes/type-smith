import * as React from "react"
import AuthNav from "../Auth/AuthNav";
import { Link } from "react-router-dom";

const NavBar : React.SFC<{}> = () => (
    <div className="navbar">
        <div className="navbar--container">
            <Link to="/" className="game-title navbar__title">
                ATLAS <span className="ra ra-lg ra-atlas" /> arena
            </Link>
            {/* <AuthNav /> */}
        </div>
    </div>
)



export default NavBar