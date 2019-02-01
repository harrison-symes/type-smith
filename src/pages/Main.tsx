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
                    
                    <Route exact path="/" render={() => {
                        const Lobby = React.lazy(() => import('./Lobby'))
                        return <React.Suspense fallback={"loading"}>
                            <Lobby />
                        </React.Suspense>
                    }} />
                    
                    <Route path="/" render={() => {
                        const MobileNav = React.lazy(() => import("../components/MobileNav/MobileNav.container"))
                        return <React.Suspense fallback={"loading"}>
                            <MobileNav />
                        </React.Suspense>   
                    }} />
        
                </React.Fragment>
        
            </Router>
        )
    }
}

export default Main