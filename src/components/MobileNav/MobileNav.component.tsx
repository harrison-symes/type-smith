import * as React from "react"
import {withRouter, Link} from "react-router-dom"
import { RouteComponentProps } from "react-router";


interface MobileNavProps extends RouteComponentProps<any> {

}

class MobileNav extends React.Component<MobileNavProps> {
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

                <div className="mobile-nav--section">
                    <span className="ra ra-exit-door"></span>
                </div>
            </div>
        )

    }
}

export default withRouter(MobileNav)