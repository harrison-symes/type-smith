import * as React from "react"
import { connect } from "react-redux"
import { Socket } from "socket.io";
import { GameState } from "../components/GameScreen/game.interface";
import { AuthState } from "../components/Auth/auth.interface";
import { HashRouter as Router, Route, RouteComponentProps } from "react-router-dom";
import { Character } from "../../shared/characters";
import { characterPreviews } from "../../shared/characterPreview";
import CharacterStats from "../components/CharacterPreview/CharacterStats";
import CharacterAbilities from "../components/CharacterPreview/CharacterAbilities";

export interface CharacterPreviewProps extends RouteComponentProps {
    socket: Socket,
    gameInfo: GameState,
    auth: AuthState,
}

interface CharacterPreviewState {
    selectedTeam: Partial<Character>[],
    activeCharacter: Partial<Character>,
}

class CharacterPreview extends React.Component<CharacterPreviewProps, CharacterPreviewState> {
    render() {
        const character = characterPreviews.find(c => c.characterClass == this.props.match.params["class"])

        if (!character) {
            this.props.history.push("/")
            return <div></div>
        }

        return (
           <div className="nav-helper scroll-container character-preview">
                <div className="character-preview--core">
                    <div className="character-preview--core-profile">
                        <div className="name-bar">
                            <div className="name-bar--text">
                                {character.characterClass}
                            </div>

                        </div>
                        <div className="portrait">
                            <div className="portrait--inner">
                                <span className={`class-icon ra ${character.icon}`} />
                            </div>
                        </div>
                    </div>
                    <div className="character-preview--core-text">
                        <span className="bold">Passive:</span>
                        {" "}
                        {character.passive}
                    </div>
                </div>
                <Router>
                    <div className="character-preview--second">
                        <Route exact path="/character/:class" render={props => {
                            const CharacterDescription = React.lazy(() => import("../components/CharacterPreview/CharacterDescription"))
                            return <React.Suspense fallback={"loading"}>
                                <CharacterDescription character={character} {...props} />}
                            </React.Suspense>
                        }} /> 
                        <Route exact path="/character/:class/stats" render={props => {
                            const CharacterStats = React.lazy(() => import("../components/CharacterPreview/CharacterStats"))
                            return <React.Suspense fallback={"loading"}>
                                <CharacterStats character={character} {...props} />
                            </React.Suspense>
                        }} /> 
                        <Route exact path="/character/:class/abilities" render={props => {
                            const CharacterAbilities = React.lazy(() => import("../components/CharacterPreview/CharacterAbilities"))
                            return <React.Suspense fallback={"loading"}>
                                <CharacterAbilities character={character} {...props} />
                            </React.Suspense>
                        }} /> 
                    </div>
                </Router>
           </div>
        )
    }
}

const mapStateToProps = ({
    socket,
    gameInfo,
    auth
}) => ({
    socket,
    gameInfo,
    auth
})

export default connect(mapStateToProps)(CharacterPreview)