import React from "react";

import ScoreButton from "./ScoreButton";
import ScoreRowArrow from "./ScoreRowArrow";

const ScoreGroup = function (props) {
    // add the arrow
    const scorebuttons = [<ScoreRowArrow key={`${props.configs.color}-arrow`}/>,]
        // then buttons for each number & the lock icon
        .concat(
            props.configs.order.map(
                (number, index) => <ScoreButton
                    key={`${props.configs.color}-${number}`}
                    display={number}
                    color={props.configs.color}
                    isClickable={props.configs.isClickable[index]}
                    isScored={props.configs.isScored[index]}
                    handleScoreButtonClick={props.handleScoreButtonClick}/>
            )
        )
    return (
        <div className={`score-group bg-quixx-${props.configs.color}`}>
            {scorebuttons}
        </div>
    )
}

export default ScoreGroup