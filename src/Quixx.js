import React from "react";

import NavBar from "./NavBar";
import ScoreTotals from "./ScoreTotals";
import ScoreGroup from "./ScoreGroup";

const numberOfButtons = 12

class Quixx extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checkedButtons: {
                red: Array(numberOfButtons).fill(false),
                yellow: Array(numberOfButtons).fill(false),
                green: Array(numberOfButtons).fill(false),
                blue: Array(numberOfButtons).fill(false),
            },
            checks: {
                red: 0,
                yellow: 0,
                green: 0,
                blue: 0
            },
            scores: {
                red: 0,
                yellow: 0,
                green: 0,
                blue: 0,
                total: 0,
            },
            ascend: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            descend: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
        }
        this.handleScoreButtonClick = this.handleScoreButtonClick.bind(this)
    }

    handleScoreButtonClick = function (event) {
        // disable clicked button
        let buttonid = event.target.id.split("-")
        event.target.disabled = true
        event.target.className += (" score-btn-scored")

        // disable the buttons before the clicked one
        if (buttonid[0] === "red" || buttonid[0] === "yellow") {
            for (let i = 0; i <= this.state.ascend.indexOf(Number(buttonid[1])); i++) {
                document.getElementById(`${buttonid[0]}-${this.state.ascend[i]}`).disabled = true
            }
        } else if (buttonid[0] === "green" || buttonid[0] === "blue") {
            for (let i = 0; i <= this.state.descend.indexOf(Number(buttonid[1])); i++) {
                document.getElementById(`${buttonid[0]}-${this.state.descend[i]}`).disabled = true
            }
        }

        // set the state with the changes made
        this.setState(previousState => {
            let checks = previousState.checks
            checks[buttonid[0]] += 1
            let scores = previousState.scores
            scores[buttonid[0]] += checks[buttonid[0]]
            scores.total = scores.red + scores.yellow + scores.green + scores.blue
            return {
                "checks": checks,
                "score": scores
            }
        })
    }

    render() {

        return (<div>
                <NavBar/>
                <div key={"scorecard"} className="score-card">
                    <ScoreGroup order={this.state.ascend} color="red" handleScoreButtonClick={this.handleScoreButtonClick}/>
                    <ScoreGroup order={this.state.ascend} color="yellow" handleScoreButtonClick={this.handleScoreButtonClick}/>
                    <ScoreGroup order={this.state.descend} color="green" handleScoreButtonClick={this.handleScoreButtonClick}/>
                    <ScoreGroup order={this.state.descend} color="blue" handleScoreButtonClick={this.handleScoreButtonClick}/>
                </div>
                <ScoreTotals scores={this.state.scores}/>
            </div>
        )
    }
}

export default Quixx
