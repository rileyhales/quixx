import React from "react"

import "./ScoreGroup.css"

const btnSizeCls = "btn-sizes"

const ScoreGroup = (props) => {
    return (
        <div className={`score-group`}>
            {
                props.state.nums.map((number, index) => {
                    let classes = ["score-btn", btnSizeCls]
                    if (props.state.scored[index]) classes.push("scored")
                    if (number === "lock" && !props.state.scored[10]) classes.push("locked")
                    return (
                        <div key={index} className={`bg-quixx-${props.state.color[index]} score-btn-wrapper`}>
                            <button className={classes.join(" ")}
                                    disabled={!props.state.canClick[index]}
                                    onClick={() => props.click(props.group, number)}
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