import React from "react"

import "./ScoreGroup.css"

const ScoreGroup = (props) => {
    return (
        <div className={`score-group bg-quixx-${props.color}`}>
            {
                props.state[props.color].order.map((number, index) => {
                    return (
                        <button key={`${props.color}-${index}`}
                                className={`score-button ${props.state[props.color].scored[index] ? "scored" : ""}`}
                                disabled={!props.state[props.color].canClick[index]}
                                onClick={() => props.click(props.color, number)}
                                aria-label={"Scoring button"}>
                            {number === "lock" ? <img className={"lock-icon"} src={process.env.PUBLIC_URL + "/lock-fill.svg"} alt={"lock icon"}/> : number}
                        </button>
                    )
                })
            }
        </div>
    )
}

export default ScoreGroup