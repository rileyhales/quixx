import React from "react";

const ScoreSkips = function (props) {
    return (
        <div className={"score-skips"}>
            <div>Skips</div>
            <div>
                <input type={"checkbox"}/>
                <input type={"checkbox"}/>
                <input type={"checkbox"}/>
                <input type={"checkbox"}/>
            </div>
        </div>
    )
}

export default ScoreSkips