import React from "react"

const btnSizeCls = "btn-sizes"

export default function ScoreColumn({groupJSON, groupID, click}) {
    return (<div className={`score-group`}>
        {groupJSON.nums.map((num, index) => {
            let classes = ["score-btn", btnSizeCls]
            if (groupJSON.scored[index]) classes.push("scored")
            if (num === "lock" && !groupJSON.scored[10]) classes.push("locked")
            return (<div key={index} className={`bg-quixx-${groupJSON.color[index]} score-btn-wrapper`}>
                <button className={classes.join(" ")}
                        disabled={!groupJSON.canClick[index]}
                        onClick={() => click(groupID, num)}
                        aria-label={"scoring button"}>
                    {num === "lock" ? <img className={"lock-icon"} src={process.env.PUBLIC_URL + "/lock-fill.svg"} alt={"lock icon"}/> : num}
                </button>
            </div>)
        })}
    </div>)
}