import React from "react"

const ScoreTotals = function (props) {
    return (
        <div className="score-totals nav-fill">
            <button className="score-btn bg-quixx-red">{props.scores.red}</button>
            <div>+</div>
            <button className="score-btn bg-quixx-yellow">{props.scores.yellow}</button>
            <div>+</div>
            <button className="score-btn bg-quixx-green">{props.scores.green}</button>
            <div>+</div>
            <button className="score-btn bg-quixx-blue">{props.scores.blue}</button>
            <div>=</div>
            <button className="score-btn">{props.scores.total}</button>
        </div>
    )
}
export default ScoreTotals