import * as React from "react"
import {withRouter, Link} from "react-router-dom"
import { RouteComponentProps } from "react-router";
import { Socket } from "socket.io";


interface MobileNavProps extends RouteComponentProps<any> {
    socket: Socket;
    logout() : void;
}

class MobileNav extends React.Component<MobileNavProps> {
    logout = () => {
        this.props.socket.emit("logout")
        this.props.logout()
    }
    render() {
        const renderLink = (path, icon) => (
            <Link to={path} className={`mobile-nav--section ${
                this.props.location.pathname == path && "selected"
            }`}>
                <span className={`ra ${icon}`}></span>
            </Link>
        )
        console.log(this.props)
        
        return (
            <div className="mobile-nav">
                {renderLink("/updates", "ra-wooden-sign")}
                {renderLink("/teambuilder", "ra-minions")}
                {renderLink("/", "ra-tabletop-players")}
                {renderLink("/profile", "ra-throne-king")}

                <div className="mobile-nav--section" onClick={this.logout}>
                    <span className="ra ra-exit-door"></span>
                </div>
            </div>
        )

    }
}

export default withRouter(MobileNav)