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

export interface PreGameProps {
    socket: Socket,
    gameInfo: GameState,
    auth: AuthState,
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

interface PreGameState {
    selectedTeam: Partial<Character>[],
    activeCharacter: Partial<Character>,
}

const teamSize = 4 || 5

class PreGame extends React.Component<PreGameProps, PreGameState> {
    constructor(props) {
        super(props)

        this.state = {
            selectedTeam: [],
            activeCharacter: null
        }
    }
    selectCharacter = (character) => {
        let { selectedTeam } = this.state

        if (selectedTeam.find(selected => selected.characterClass == character.characterClass)) {
            selectedTeam = selectedTeam.filter(selected => selected.characterClass != character.characterClass)

        } else if (selectedTeam.length < teamSize) {
            selectedTeam.push(character)
        }
        this.setState({ selectedTeam })
    }
    submitTeam = () => {
        const { socket, gameInfo } = this.props
        const { selectedTeam, activeCharacter } = this.state

        const idx = selectedTeam.findIndex(c => c.characterClass == activeCharacter.characterClass)

        selectedTeam[idx].isActive = true

        socket.emit(
            TEAM_PREVIEW_SOCKET_CHANNEL.SUBMIT_TEAM,
            gameInfo.roomId,
            gameInfo.user_id,
            selectedTeam
        )
    }
    render() {
        const {selectedTeam} = this.state

        return (
            <Router>
                <React.Fragment>
                    <NavBar />
                    <React.Fragment>
                        <div className="lobby nav-helper">
                            <h2 className="page-title">Choose your team</h2>
                            <TeamPreview 
                                characters={characters}
                                selectCharacter={this.selectCharacter}
                                selectedTeam={selectedTeam}
                            />
                        </div>
                    </React.Fragment>

                    {/* <Route exact path="/" component={Lobby} />

                    <Route path="/" component={MobileNav} /> */}

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