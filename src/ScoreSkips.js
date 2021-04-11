import React from "react";

const ScoreSkips = function (props) {
    const checkboxes =
        props.skips.map(
            (value, index) => {
                console.log(value)
                console.log(index)
                return <input
                    key={`skip${index}`}
                    type={"checkbox"}
                    checked={value}
                    onChange={(event) => props.handleSkipCheck(event, index)}/>
            })

    return (
        <div
            className={"score-skips"}>
            <div>Skips</div>
            <div>
                {checkboxes}
            </div>
        </div>
    )
}

export default ScoreSkips