import React from "react"

const ScoreTotals = function (props) {
    return (
        <div className="score-totals nav-fill">
            <button className="score-total-btn bg-quixx-red">{props.scores.red}</button>
            <div>+</div>
            <button className="score-total-btn bg-quixx-yellow">{props.scores.yellow}</button>
            <div>+</div>
            <button className="score-total-btn bg-quixx-green">{props.scores.green}</button>
            <div>+</div>
            <button className="score-total-btn bg-quixx-blue">{props.scores.blue}</button>
            <div>=</div>
            <button className="score-total-btn">{props.scores.total}</button>
            <div>
                Skips
            </div>
            <input type={"checkbox"}/>
            <input type={"checkbox"}/>
            <input type={"checkbox"}/>
            <input type={"checkbox"}/>
        </div>
    )
}
export default ScoreTotals