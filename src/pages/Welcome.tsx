import * as React from "react"
import { HashRouter as Router, Route } from "react-router-dom"

import Register from "../components/Auth/Register.container"
import Login from "../components/Auth/Login.container"
import NavBar from "../components/NavBar/NavBar.component";

const Welcome : React.SFC<{}> = () => (
    <Router>
        <div className="welcome-page">
            <span className="mb4 center">
                <h1 className="game-title">Type Smith</h1>
            </span>
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={Login} />
        </div>
    </Router>
)

export default Welcome