import * as React from "react"
import {withRouter, Link} from "react-router-dom"
import { RouteComponentProps } from "react-router";


interface PreGameMobileNavProps extends RouteComponentProps<any> {
    logout() : void;
}

class PreGameMobileNav extends React.Component<PreGameMobileNavProps> {
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
                <Link to={"/"} className={`mobile-nav--section`}>
                    <span className={`ra ra-cancel`}></span>
                </Link>
                {renderLink("/", "ra-minions")}
                {renderLink("/", "ra-coronation")}
                <Link to={"/"} className={`mobile-nav--section`}>
                    <span className={`ra ra-play-button`}></span>
                </Link>
            </div>
        )

    }
}

export default withRouter(PreGameMobileNav)