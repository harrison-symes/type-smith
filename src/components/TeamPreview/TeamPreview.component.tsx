import * as React from "react"
import { Socket } from "socket.io";
import { GameState } from "../GameScreen/game.interface";
import { CharacterClassList, Character } from "../../interfacing/characters";
import { Link } from "react-router-dom";

export interface TeamPreviewProps {
    socket: Socket,
    gameInfo: GameState,
    characters: Partial<Character>[],
    leadCharacter: Partial<Character>,
    selectedTeam: Partial<Character>[],
    selectCharacter (character: Partial<Character>) : void;
    selectLeadCharacter (character: Partial<Character>) : void;
}

interface TeamPreviewState {
    selectedTeam: Partial<Character>[],
    activeCharacter: Partial<Character>,
}

class TeamPreview extends React.Component<TeamPreviewProps, TeamPreviewState> {
    // renderStatBars = characterClass => {
    //     const stat = (label, stat) => (
    //         <Progress
    //             type="circle"
    //             symbolClassName="ra ra-crossed-swords"
    //             symbol={`${stat}`}
    //             width={80}
    //             percent={stat / 5 * 100}
    //         />
    //     )
        
    //     return (
    //         <div className="team-preview--stats">
    //             {stat("Health", statSheets[characterClass].healthStat)}
    //             {stat("Energy", statSheets[characterClass].energyStat)}
    //             {stat("Power", statSheets[characterClass].powerStat)}
    //             {stat("Defense", statSheets[characterClass].defenseStat)}
    //             {stat("Speed", statSheets[characterClass].speedStat)}
    //         </div>

    //     )
    // }
    // renderTooltip = character => {
    //     return <span>
    //         <div>{classDescriptions[character.characterClass]}</div>
    //         <hr />
    //         <div>{passives[character.characterClass]}</div>
    //     </span>
    // }
    render() {
        const {selectedTeam, characters, selectCharacter, leadCharacter} = this.props
        
        return (
                <div className="character-roster">
                    {characters.map(character => (
                        <div className={`character-roster--item ${
                            !!selectedTeam.find(selected => selected.characterClass == character.characterClass) 
                                ? "selected"
                                : selectedTeam.length == 4 && "disabled"
                        }`}>
                            <div className="name-bar" onClick={() => selectCharacter(character)}>
                                <div className="name-bar--text">
                                    {character.characterClass}
                                </div>

                            </div>
                            <div className="portrait" onClick={() => selectCharacter(character)}>
                                <div className="portrait--inner">

                                </div>
                            </div>
                            <span className="info-icons">
                                <span className="info-icon">
                                    <Link to="/character" className="ra ra-id-card" />
                                </span>
                                {
                                    leadCharacter 
                                    ? leadCharacter.characterClass == character.characterClass
                                        ? <span className="info-icon play" onClick={() => this.props.selectLeadCharacter(character)}>
                                            <span className="ra ra-crown" />
                                        </span>
                                        : <span className="info-icon crown disabled">
                                            <span className="ra ra-crown" />
                                        </span>
                                        : <span className="info-icon remove" onClick={() => this.props.selectLeadCharacter(character)}>
                                            <span className="ra ra-crown" />
                                        </span>
                                }
                                

                            </span>
                        </div>
                    ))}
                </div>
        )
    }
}

export default TeamPreview