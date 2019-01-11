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
    gameInfo: GameState
}

const characters = [
    {
        characterClass: CharacterClassList.WARRIOR,
        abilities: [
            { name: GAME_ATTACKS.DEMOLISH },
            { name: GAME_ATTACKS.SLASH },
            { name: GAME_ATTACKS.RECKLESS_SLAM },
            { name: GAME_ATTACKS.TANK_UP }
        ]
    },
    {
        characterClass: CharacterClassList.MAGE,
        abilities: [
            { name: GAME_ATTACKS.METEOR },
            { name: GAME_ATTACKS.FIREBALL },
            { name: GAME_ATTACKS.MOLTEN_CORE },
            { name: GAME_ATTACKS.FROST_ARMOUR },
        ]
    },
    {
        characterClass: CharacterClassList.ASSASSIN,
        abilities: [
            { name: GAME_ATTACKS.ASSASSINATE },
            { name: GAME_ATTACKS.BACKSTAB },
            { name: GAME_ATTACKS.RECUPERATE },
            { name: GAME_ATTACKS.ACCELERATE }
        ]
    },
    {
        characterClass: CharacterClassList.PALADIN,
        abilities: [
            { name: GAME_ATTACKS.SANCTUARY },
            { name: GAME_ATTACKS.BLESSED_HAMMER },
            { name: GAME_ATTACKS.HOLY_RADIANCE },
            { name: GAME_ATTACKS.INSPIRE },
        ]
    },
    {
        characterClass: CharacterClassList.WITCH,
        abilities: [
            { name: GAME_ATTACKS.WITCHING_HOUR },
            { name: GAME_ATTACKS.BLOOD_MOON },
            { name: GAME_ATTACKS.CURSE },
            { name: GAME_ATTACKS.ENTRAP },
        ]
    },
    {
        characterClass: CharacterClassList.SNIPER,
        abilities: [
            { name: GAME_ATTACKS.RAPID_FIRE },
            { name: GAME_ATTACKS.PIERCING_SHOT },
            { name: GAME_ATTACKS.RELOAD },
            { name: GAME_ATTACKS.SPIKE_TRAP },
        ]
    },
] as Partial<Character>[]

const icons = {
    [CharacterClassList.WARRIOR]: "ra-crossed-swords",
    [CharacterClassList.MAGE]: "ra-wizard-face",
    [CharacterClassList.ASSASSIN]: "ra-cowled",
    [CharacterClassList.PALADIN]: "ra-elf-helmet",
    [CharacterClassList.WITCH]: "ra-witch-face",
    [CharacterClassList.SNIPER]: "ra-eye-target",
}

const passives = {
    [CharacterClassList.WARRIOR]: "The Warriors attacks have their power increased by 1% for each point of health the Warrior is missing",
    [CharacterClassList.MAGE]: "The Mage gains +1 Power at the end of each turn while Active.",
    [CharacterClassList.ASSASSIN]: "The Assassin has +6 Priority when switching",
    [CharacterClassList.PALADIN]: "The Paladin restores 1 Health to themselves at the end of each turn while Active.",
    [CharacterClassList.WITCH]: "All of the Witch's attacks also lower the opponent's Defense by 1",
    [CharacterClassList.SNIPER]: "The Sniper gains +1 bonus Energy at the end of each turn, no matter where they are."
}

const classDescriptions = {
    [CharacterClassList.WARRIOR]: "A Brutal attacker. The Warrior can efficiently deal heavy amounts of damage to opponents.",
    [CharacterClassList.MAGE]: "Strong power but weak defenses. The Mage can boost their power to deal devastating attacks.",
    [CharacterClassList.ASSASSIN]: "Fast and fragile. The Assassin can get off some quick attacks to finish weakened enemies, or power up to run away with the game.",
    [CharacterClassList.PALADIN]: "Slow and Sturdy. The Paladin can heal and buff their teamates, but deals little damage themselves.",
    [CharacterClassList.WITCH]: "Nasty and tricky. The Witch can lower opponent's stats, prevent switching, and turn their enemies own power against them",
    [CharacterClassList.SNIPER]: "The Sniper can shoot through opponent's defense, build up to their ultimate quickly, which is a devastating attack in itself. They can also spike trap opponents, causing them to take damage when switching out."
}

interface TeamPreviewState {
    selectedTeam: Partial<Character>[],
    activeCharacter: Partial<Character>,
}

const teamSize = 4 || 5

class TeamPreview extends React.Component<TeamPreviewProps, TeamPreviewState> {
    constructor(props) {
        super(props)

        this.state = {
            selectedTeam: [],
            activeCharacter: null
        }
    }
    selectCharacter = (character) => {
        let {selectedTeam, activeCharacter} = this.state

        if (selectedTeam.find(selected => selected.characterClass == character.characterClass)) {
            if (activeCharacter.characterClass == character.characterClass) return

            selectedTeam = selectedTeam.filter(selected => selected.characterClass != character.characterClass)
        } else if (selectedTeam.length < teamSize) {
            selectedTeam.push(character)
        }
        this.setState({selectedTeam})
    }
    submitTeam = () => {
        const {socket, gameInfo} = this.props
        const {selectedTeam, activeCharacter} = this.state

        const idx = selectedTeam.findIndex(c => c.characterClass == activeCharacter.characterClass)
        
        selectedTeam[idx].isActive = true

        socket.emit(
            TEAM_PREVIEW_SOCKET_CHANNEL.SUBMIT_TEAM,
            gameInfo.roomId,
            gameInfo.user_id,
            selectedTeam
        )
    }
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
    renderTooltip = character => {
        return <span>
            <div>{classDescriptions[character.characterClass]}</div>
            <hr />
            <div>{passives[character.characterClass]}</div>
        </span>
    }
    render() {
        const {selectedTeam, activeCharacter} = this.state

        return (
            <div className="center w-70">
                <h1 className="page-title">Team Preview</h1>
                
                <div className="team-preview--container flex justify-center">
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
                </div>
                {selectedTeam.length == teamSize ?
                    activeCharacter ?
                        <button onClick={this.submitTeam} className="btn btn--green w-50 hpx-100">
                            SUBMIT TEAM
                        </button> : 
                    <h1 className="page-title">Pick your Lead Character</h1>
                    :
                    <h1 className="page-title">Select your team members ({selectedTeam.length} / {teamSize})</h1>
                }
            </div>
        )
    }
}

export default TeamPreview