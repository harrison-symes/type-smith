import * as React from "react"
import { HashRouter as Router, Route } from "react-router-dom"

import Register from "../components/Auth/Register.container"
import Login from "../components/Auth/Login.container"
import NavBar from "../components/NavBar/NavBar.component";

const Welcome : React.SFC<{}> = () => (
    <Router>
        <React.Fragment>
            <NavBar />
            <div className="nav-helper">
                <Route exact path="/register" component={Register} />
                <Route exact path="/" component={Login} />
            </div>
        </React.Fragment>
    </Router>
)

export default Welcome