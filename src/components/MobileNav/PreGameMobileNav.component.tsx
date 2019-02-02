import * as React from "react"
import {withRouter, Link} from "react-router-dom"
import { RouteComponentProps } from "react-router";


interface PreGameMobileNavProps extends RouteComponentProps<any> {
    teamReady: boolean;
    readyTeam () : void;
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
        
        return (
            <div className="mobile-nav">
                <Link to={"/"} className={`mobile-nav--section`}>
                    <span className={`ra ra-cancel`}></span>
                </Link>
                {renderLink("/", "ra-minions")}
                {renderLink("/", "ra-coronation")}
                {this.props.teamReady ?
                    <span className={`mobile-nav--section`}>
                        <span className={`ra ra-sands-of-time`}></span>
                    </span> :
                    <span className={`mobile-nav--section`} onClick={this.props.readyTeam}>
                        <span className={`ra ra-play-button`}></span>
                    </span>
                }
            </div>
        )

    }
}

export default withRouter(PreGameMobileNav)