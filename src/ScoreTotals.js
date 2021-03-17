import React from "react"

const ScoreTotals = function (props) {
    return (
        <div className="score-totals">
            <button>{props.scores.red}</button>
            <button>{props.scores.yellow}</button>
            <button>{props.scores.green}</button>
            <button>{props.scores.blue}</button>
        </div>
    )
}
export default ScoreTotals