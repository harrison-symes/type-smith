import * as React from "react"
import {connect} from "react-redux"
import TeamPreview from "../components/TeamPreview/TeamPreview.container";
import { Socket } from "socket.io";
import { GameState } from "../components/GameScreen/game.interface";
import { AuthState } from "../components/Auth/auth.interface";
import {HashRouter as Router, Route} from "react-router-dom";
import NavBar from "../components/NavBar/NavBar.component";
import { Character, CharacterClassList } from "../interfacing/characters";
import { GAME_ATTACKS } from "../../shared/attacks";
import { TEAM_PREVIEW_SOCKET_CHANNEL } from "../../shared/socketChannels";
import PreGameMobileNav from "../components/MobileNav/PreGameMobileNav.container";
import CharacterPreview from "./CharacterPreview";
import CharacterPreviewMobileNav from "../components/MobileNav/CharacterPreviewMobileNav.component";
import { characterPreviews } from "../../shared/characterPreview";

export interface PreGameProps {
    socket: Socket,
    gameInfo: GameState,
    auth: AuthState,
}

interface PreGameState {
    selectedTeam: Partial<Character>[],
    leadCharacter: Partial<Character> | null,
    teamReady: boolean;
}

const teamSize = 4 || 5

class PreGame extends React.Component<PreGameProps, PreGameState> {
    constructor(props) {
        super(props)

        this.state = {
            selectedTeam: [],
            leadCharacter: null,
            teamReady: false
        }
    }
    selectCharacter = (character) => {
        let { selectedTeam, leadCharacter, teamReady} = this.state

        if (teamReady) return

        if (selectedTeam.find(selected => selected.characterClass == character.characterClass)) {
            selectedTeam = selectedTeam.filter(selected => selected.characterClass != character.characterClass)
            if (leadCharacter && character.characterClass == leadCharacter.characterClass){
                this.setState({leadCharacter: null})
            }

        } else if (selectedTeam.length < teamSize) {
            selectedTeam = [...selectedTeam, character]
        }
        this.setState({ selectedTeam })
    }
    selectLeadCharacter = (character: Partial<Character>) => {
        const {leadCharacter, teamReady} = this.state

        if (teamReady) return

        if (leadCharacter) {
            this.setState({
                leadCharacter: null
            })
        } else {
            this.setState({
                leadCharacter: character
            })
        }
    }
    submitTeam = () => {
        const { socket, gameInfo } = this.props
        const { selectedTeam, leadCharacter } = this.state

        if (selectedTeam.length != teamSize || !leadCharacter) return

        const idx = selectedTeam.findIndex(c => c.characterClass == leadCharacter.characterClass)

        selectedTeam[idx].isActive = true

        socket.emit(
            TEAM_PREVIEW_SOCKET_CHANNEL.SUBMIT_TEAM,
            gameInfo.roomId,
            gameInfo.user_id,
            selectedTeam
        )
        this.setState({
            teamReady: true
        })
    }
    render() {
        const {selectedTeam, leadCharacter} = this.state

        return (
            <Router>
                <React.Fragment>
                    <NavBar />
                    <Route exact path="/" render={(props) => (
                        <React.Fragment>
                            <div className="lobby nav-helper">
                                <h2 className="page-title">Choose your team</h2>
                                <TeamPreview 
                                    characters={characterPreviews}
                                    selectCharacter={this.selectCharacter}
                                    selectedTeam={selectedTeam}
                                    leadCharacter={leadCharacter}
                                    selectLeadCharacter={this.selectLeadCharacter}
                                    {...props}
                                />
                            </div>
                        </React.Fragment>
                    )} />
                    <Route path="/character/:class" component={CharacterPreview} />
                    
                    {/* <Route exact path="/" component={Lobby} />

                    <Route path="/" component={MobileNav} /> */}
                    <Route exact path="/" render={props => <PreGameMobileNav
                        teamReady={this.state.teamReady}
                        readyTeam={this.submitTeam}
                        {...props}
                    />} />
                    <Route path="/character/:class" component={CharacterPreviewMobileNav} />

                </React.Fragment>

            </Router>
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

export default connect(mapStateToProps)(PreGame)