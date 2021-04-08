import React from "react";

import NavBar from "./NavBar";
import ScoreTotals from "./ScoreTotals";
import ScoreGroup from "./ScoreGroup";


class Quixx extends React.Component {
    constructor(props) {
        super(props)

        const numberOfButtons = 12
        const ascendOrder = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "lock"]
        const descendOrder = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, "lock"]

        this.state = {
            undoState: null,
            redoState: null,
            red: {
                color: "red",
                isScored: Array(numberOfButtons).fill(false),
                isClickable: Array(numberOfButtons).fill(true),
                order: ascendOrder
            },
            yellow: {
                color: "yellow",
                isScored: Array(numberOfButtons).fill(false),
                isClickable: Array(numberOfButtons).fill(true),
                order: ascendOrder
            },
            green: {
                color: "green",
                isScored: Array(numberOfButtons).fill(false),
                isClickable: Array(numberOfButtons).fill(true),
                order: descendOrder
            },
            blue: {
                color: "blue",
                isScored: Array(numberOfButtons).fill(false),
                isClickable: Array(numberOfButtons).fill(true),
                order: descendOrder
            },
            scores: {
                red: 0,
                yellow: 0,
                green: 0,
                blue: 0,
                total: 0,
            },
        }

        this.handleScoreButtonClick = this.handleScoreButtonClick.bind(this)
        this.handleUndoButtonClick = this.handleUndoButtonClick.bind(this)
        this.handleRedoButtonClick = this.handleRedoButtonClick.bind(this)
    }

    computeScore = function (count) {
        // modified formula for sum between 2 numbers for lower number always being 1
        return count * (count + 1) / 2
    }

    calculateAllScores = function (newState) {
        const scoreRed = this.computeScore(newState.red.isScored.filter(Boolean).length)
        const scoreYellow = this.computeScore(newState.yellow.isScored.filter(Boolean).length)
        const scoreGreen = this.computeScore(newState.green.isScored.filter(Boolean).length)
        const scoreBlue = this.computeScore(newState.blue.isScored.filter(Boolean).length)
        return {
            red: scoreRed,
            yellow: scoreYellow,
            green: scoreGreen,
            blue: scoreBlue,
            total: scoreRed + scoreYellow + scoreGreen + scoreBlue
        }
    }

    handleUndoButtonClick = function () {
        if (this.state.undoState === null) {
            return
        }
        this.setState(currentState => {
            // cache a clone of the current state as the state to "redo"
            currentState.undoState.redoState = JSON.parse(JSON.stringify(currentState))
            return currentState.undoState
        })
    }
    handleRedoButtonClick = function () {
        if (this.state.redoState === null) {
            return
        }
        this.setState(currentState => {
            // cache a clone of the current state as the state to "undo"
            currentState.redoState.undoState = JSON.parse(JSON.stringify(currentState))
            return currentState.redoState
        })
    }

    handleScoreButtonClick = function (event, targetColor, targetNumber) {
        this.setState(currentState => {
            // cache a clone of the current state into possible undo states, no more forward button
            currentState.undoState = JSON.parse(JSON.stringify(currentState))
            currentState.redoState = null

            // figure out which index in the scoring/clickable arrays we're on
            const targetIndex = currentState[targetColor].order.indexOf(targetNumber)

            // toggle the scored status of the button
            currentState[targetColor].isScored[targetIndex] = !(currentState[targetColor].isScored[targetIndex])

            // figure out what buttons should be clickable
            const indexOfHighestScoredBox = currentState[targetColor].isScored.lastIndexOf(true)
            currentState[targetColor].isClickable = currentState[targetColor].isClickable.map((element, index) => {
                return !(index < indexOfHighestScoredBox)
            })

            // calculate the new scores
            currentState.scores = this.calculateAllScores(currentState)
            return currentState
        })
    }

    render() {

        return (
            <div>
                <NavBar canUndo={!(this.state.undoState === null)} canRedo={!(this.state.redoState === null)} handleUndoButtonClick={this.handleUndoButtonClick} handleRedoButtonClick={this.handleRedoButtonClick}/>
                <div key={"scorecard"} className="score-card">
                    <ScoreGroup configs={this.state.red} handleScoreButtonClick={this.handleScoreButtonClick}/>
                    <ScoreGroup configs={this.state.yellow} handleScoreButtonClick={this.handleScoreButtonClick}/>
                    <ScoreGroup configs={this.state.green} handleScoreButtonClick={this.handleScoreButtonClick}/>
                    <ScoreGroup configs={this.state.blue} handleScoreButtonClick={this.handleScoreButtonClick}/>
                </div>
                <ScoreTotals scores={this.state.scores}/>
            </div>
        )
    }
}

export default Quixx
