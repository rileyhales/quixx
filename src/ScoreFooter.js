import React from "react";

import ScoreTotals from "./ScoreTotals";
import ScoreSkips from "./ScoreSkips";

const ScoreFooter = function (props) {
    return (
        <div className="quixx-footer">
            <ScoreTotals scores={props.scores}/>
            <ScoreSkips/>
        </div>
    )
}

export default ScoreFooter