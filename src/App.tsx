import * as React from "react";
import {connect} from "react-redux"
import { HashRouter as Router, Route } from "react-router-dom"

import Welcome from "./pages/Welcome"
import { AuthState } from "components/Auth/auth.interface";

import "./sass/main.scss"

interface AppProps {
    auth: AuthState
}

const App : React.SFC<AppProps> = (props) => (
    <Router>
        <React.Fragment>
            {props.auth.user && props.auth.user.user_name}
            {
                props.auth.isAuthenticated ? 
                <Route path="/" render={() => <div>Hi</div>} /> :
                <Route path="/" component={Welcome} />
            }
        </React.Fragment>
    </Router>
)

const mapStateToProps = ({auth}) => ({
    auth
})

export default connect(mapStateToProps)(App)
