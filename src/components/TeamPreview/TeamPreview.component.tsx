import * as React from "react"
import { Socket } from "socket.io";
import { GameState } from "../GameScreen/game.interface";
import { CharacterClassList, Character } from "../../interfacing/characters";
import { GAME_ATTACKS } from "../../../shared/attacks";
import { TEAM_PREVIEW_SOCKET_CHANNEL } from "../../../shared/socketChannels";
import { ProgressBar } from "react-bootstrap";
import { statSheets } from "../../../server/gameUtils.ts/statSheets";
import { Tooltip } from "react-tippy"

import CircularProgressbar from 'react-circular-progressbar';
import { Progress } from 'react-sweet-progress';


export interface TeamPreviewProps {
    socket: Socket,
    gameInfo: GameState,
    selectedTeam: Character[],
    characters: Character[],
    selectCharacter (character: Character) : void;
}

interface TeamPreviewState {
    selectedTeam: Partial<Character>[],
    activeCharacter: Partial<Character>,
}

class TeamPreview extends React.Component<TeamPreviewProps, TeamPreviewState> {
    renderStatBars = characterClass => {
        const stat = (label, stat) => (
            <Progress
                type="circle"
                symbolClassName="ra ra-crossed-swords"
                symbol={`${stat}`}
                width={80}
                percent={stat / 5 * 100}
            />
        )
        
        return (
            <div className="team-preview--stats">
                {stat("Health", statSheets[characterClass].healthStat)}
                {stat("Energy", statSheets[characterClass].energyStat)}
                {stat("Power", statSheets[characterClass].powerStat)}
                {stat("Defense", statSheets[characterClass].defenseStat)}
                {stat("Speed", statSheets[characterClass].speedStat)}
            </div>

        )
    }
    // renderTooltip = character => {
    //     return <span>
    //         <div>{classDescriptions[character.characterClass]}</div>
    //         <hr />
    //         <div>{passives[character.characterClass]}</div>
    //     </span>
    // }
    render() {
        const {selectedTeam, characters, selectCharacter} = this.props
        
        return (
                <div className="character-roster">
                    {characters.map(character => (
                        <div className={`character-roster--item ${
                            !!selectedTeam.find(selected => selected.characterClass == character.characterClass) && "selected"
                        }`}>
                            <div className="portrait" onClick={() => selectCharacter(character)}>
                                <div className="portrait--inner">

                                </div>
                            </div>
                            <div className="name-bar" onClick={() => selectCharacter(character)}>
                                <div className="name-bar--text">
                                    {character.characterClass}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* <div className="team-preview--container flex justify-center">
                    {characters.map(character => (
                        <div
                            className={`team-preview--character ${
                                !!selectedTeam.find(selected => selected.characterClass == character.characterClass) && "team-preview--character--selected"
                                }`}
                            onClick={()=>this.selectCharacter(character)}
                        >
                            <h3>
                                {character.characterClass}
                                <span className={`ra ra-lg ${icons[character.characterClass]}`} />
                            </h3>

                            {this.renderStatBars(character.characterClass)}
                            <span className="flex">
                                <Tooltip
                                    position="bottom"
                                    trigger="mouseenter"
                                    animation="perspective"
                                    inertia
                                    arrow="true"
                                    className="w-100"
                                    html={this.renderTooltip(character)}

                                >  
                                    <button className="btn btn--purple w-100" disabled>Info</button>
                                </Tooltip>
                                {activeCharacter
                                    ? activeCharacter.characterClass == character.characterClass 
                                        ? <button onClick={()=>this.setState({activeCharacter: null})}className="btn w-100 btn--purple">Deselect Lead</button>
                                        : null
                                    : !!selectedTeam.find(c=>c.characterClass==character.characterClass) 
                                        ? <button onClick={()=>this.setState({activeCharacter: character})} className="btn w-100 btn--green">Make Lead</button>
                                        : null
                                }
                                
                            </span>
                        </div>
                    ))}
                </div> */}
                // {selectedTeam.length == teamSize ?
                //     activeCharacter ?
                //         <button onClick={this.submitTeam} className="btn btn--green w-50 hpx-100">
                //             SUBMIT TEAM
                //         </button> : 
                //     <h1 className="page-title">Pick your Lead Character</h1>
                //     :
                //     <h1 className="page-title">Select your team members ({selectedTeam.length} / {teamSize})</h1>
                // }
        )
    }
}

export default TeamPreview