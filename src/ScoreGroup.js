import React from "react"

import "./ScoreGroup.css"

const ScoreGroup = (props) => {
    return (
        <div className={`score-group`}>
            {
                props.state.order.map((number, index) => {
                    let classes = ["score-button", "button-sizes"]
                    if (props.state.scored[index]) classes.push("scored")
                    if (number === "lock" && !props.state.scored[10]) classes.push("locked")
                    return (
                        <div className={`bg-quixx-${props.color} score-button-wrapper`}>
                            <button key={index}
                                    className={classes.join(" ")}
                                    disabled={!props.state.canClick[index]}
                                    onClick={() => props.click(props.color, number)}
                                    aria-label={"scoring button"}>
                                {number === "lock" ? <img className={"lock-icon"} src={process.env.PUBLIC_URL + "/lock-fill.svg"} alt={"lock icon"}/> : number}
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ScoreGroup