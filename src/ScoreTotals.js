import React from "react"

const ScoreTotals = function (props) {
    return (
        <div className="score-totals">
            <button className="score-total-btn bg-quixx-red-op">{props.scores.red}</button>
            <div>+</div>
            <button className="score-total-btn bg-quixx-yellow-op">{props.scores.yellow}</button>
            <div>+</div>
            <button className="score-total-btn bg-quixx-green-op">{props.scores.green}</button>
            <div>+</div>
            <button className="score-total-btn bg-quixx-blue-op">{props.scores.blue}</button>
            <div>-</div>
            <button className="score-total-btn">{props.scores.skips}</button>
            <div>=</div>
            <button className="score-total-btn">{props.scores.total}</button>
        </div>
    )
}
export default ScoreTotals