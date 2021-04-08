import React from 'react';

const ScoreButton = function (props) {
    return (
        <button
            className={`btn score-btn txt-quixx-${props.color} ${props.isScored ? 'score-btn-scored' : ""}`}
            onClick={(event) => props.handleScoreButtonClick(event, props.color, props.display)}
            disabled={!props.isClickable}>
            {props.display === "lock" ? <img alt="Lock group icon" src="lock-fill.svg"></img> : props.display}
        </button>
    )
}

export default ScoreButton