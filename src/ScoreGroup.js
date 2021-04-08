import React from "react";

import ScoreButton from "./ScoreButton";

const ScoreGroup = function (props) {
    let scorebuttons = props.order.map(
        sum => <ScoreButton
            key={`${props.color}-${sum}`}
            id={`${props.color}-${sum}`}
            display={sum}
            color={props.color}
            handleScoreButtonClick={props.handleScoreButtonClick}/>
    );
    scorebuttons = [<ScoreButton
        key={`${props.color}-arrow`}
        id={`${props.color}-arrow`}
        display="arrow"
        color={props.color}
    />,]
        .concat(scorebuttons)
        .concat([
            <ScoreButton
                key={`${props.color}-lock`}
                id={`${props.color}-lock`}
                display="lock"
                color={props.color}
                handleScoreButtonClick={props.handleScoreButtonClick}
            />,
        ])
    return (
        <div key={`score-group-${props.color}`} className={`score-group bg-quixx-${props.color}`}>
            {scorebuttons}
        </div>
    )
}

export default ScoreGroup