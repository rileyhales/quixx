import React from "react"

import ScoreGroup from "./ScoreGroup";
import ScoreTotals from "./ScoreTotals";

class ScoreCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
                blue: 0
            },
            ascendorder: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            descendorder: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
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
            for (let i = 0; i <= this.state.ascendorder.indexOf(Number(buttonid[1])); i++) {
                document.getElementById(`${buttonid[0]}-${this.state.ascendorder[i]}`).disabled = true
            }
        } else if  (buttonid[0] === "green" || buttonid[0] === "blue") {
            for (let i = 0; i <= this.state.descendorder.indexOf(Number(buttonid[1])); i++) {
                document.getElementById(`${buttonid[0]}-${this.state.descendorder[i]}`).disabled = true
            }
        }

        // set the state with the changes made
        this.setState(previousState => {
            let checks = previousState.checks
            checks[buttonid[0]] += 1
            let scores = previousState.scores
            scores[buttonid[0]] += checks[buttonid[0]]
            return {
                "checks": checks,
                "score": scores
            }
        })
    }

    render() {
        return (
            <div key={"scorecard"} className="score-card">
                <ScoreGroup order="descending" color="blue" handleScoreButtonClick={this.handleScoreButtonClick}/>
                <ScoreGroup order="descending" color="green" handleScoreButtonClick={this.handleScoreButtonClick}/>
                <ScoreGroup order="ascending" color="yellow" handleScoreButtonClick={this.handleScoreButtonClick}/>
                <ScoreGroup order="ascending" color="red" handleScoreButtonClick={this.handleScoreButtonClick}/>
                <ScoreTotals scores={this.state.scores}/>
            </div>
        )
    }
}

export default ScoreCard