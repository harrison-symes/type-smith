import * as React from "react"
import {HashRouter as Router, Route } from "react-router-dom" 
import NavBar from "../components/NavBar/NavBar.component";
import MobileNav from "../components/MobileNav/MobileNav.container";
import Lobby from "./Lobby";

class Main extends React.Component<{}> {
    componentDidMount() {
        if (window.location != "/#" as any) {
            window["location"] = "/#" as any
        }
    }
    render() {
        return (
            <Router>
                <React.Fragment>
                    <NavBar />
                    
                    <Route exact path="/" component={Lobby} />
                    <Route path="/" component={MobileNav} />
        
                </React.Fragment>
        
            </Router>
        )
    }
}

export default Main