import * as React from "react"
import {withRouter, Link} from "react-router-dom"
import { RouteComponentProps } from "react-router";


interface CharacterPreviewMobileNavProps extends RouteComponentProps<any> {
    logout() : void;
}

class CharacterPreviewMobileNav extends React.Component<CharacterPreviewMobileNavProps> {
    render() {
        const renderLink = (path, icon) => (
            <Link to={path} className={`mobile-nav--section ${
                this.props.location.pathname == path && "selected"
            }`}>
                <span className={`ra ${icon}`}></span>
            </Link>
        )
        const characterClass = this.props.match.params["class"]

        return (
            <div className="mobile-nav">
                <Link to={"/"} className={`mobile-nav--section`}>
                    <span className={`ra ra-return-arrow`}></span>
                </Link>
                {renderLink(`/character/${characterClass}`, "ra-id-card")}
                {renderLink(`/character/${characterClass}/stats`, "ra-abacus")}
                {renderLink(`/character/${characterClass}/abilities`, "ra-retro-controller")}
            </div>
        )

    }
}

export default withRouter(CharacterPreviewMobileNav)