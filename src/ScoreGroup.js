import React from "react"

import "./ScoreGroup.css"

const ScoreGroup = (props) => {
    return (
        <div className={`score-group bg-quixx-${props.color}`}>
            {
                props.state.order.map((number, index) => {
                    let classes = ["score-button", "button-sizes"]
                    if (props.state.scored[index]) classes.push("scored")
                    if (number === "lock" && !props.state.scored[10]) classes.push("locked")
                    return (
                        <button key={index}
                                className={classes.join(" ")}
                                disabled={!props.state.canClick[index]}
                                onClick={() => props.click(props.color, number)}
                                aria-label={"scoring button"}>
                            {number === "lock" ? <img className={"lock-icon"} src={process.env.PUBLIC_URL + "/lock-fill.svg"} alt={"lock icon"}/> : number}
                        </button>
                    )
                })
            }
        </div>
    )
}

export default ScoreGroup