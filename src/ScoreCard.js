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
            }
        }
        this.handleScoreButtonClick = this.handleScoreButtonClick.bind(this)
    }

    handleScoreButtonClick = function (event) {
        // disable clicked button
        event.target.disabled = true
        event.target.className += (" score-btn-scored")

        // score the clicked button
        console.log(event)
        console.log(event.target.id)
        let buttonid = event.target.id.split("-")


        // todo disable the buttons before the one you clicked on

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