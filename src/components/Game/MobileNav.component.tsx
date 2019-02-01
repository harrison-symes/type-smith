import * as React from "react"
import {withRouter, Link} from "react-router-dom"
import { RouteComponentProps } from "react-router";
import { Socket } from "socket.io";


interface MobileNavProps extends RouteComponentProps<any> {
    socket: Socket;
}

class MobileNav extends React.Component<MobileNavProps> {
    render() {
        const renderLink = (path, icon) => (
            <Link 
                to={this.props.location.pathname == path ? "/" : path} 
                className={`mobile-nav--section ${
                    this.props.location.pathname == path && "selected"
                    }`
                }
            >
                <span className={`ra ${icon}`}></span>
            </Link>
        )
        console.log(this.props)
        
        return (
            <div className="mobile-nav">
                {renderLink("/leave", "ra-flying-flag")}
                {renderLink("/team", "ra-minions")}
                {renderLink("/", "ra-tabletop-players")}
                {renderLink("/abilities", "ra-retro-controller")}
                {renderLink("/log", "ra-wooden-sign")}
            </div>
        )

    }
}

export default withRouter(MobileNav)