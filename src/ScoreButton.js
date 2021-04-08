import React from 'react';
import {SVG_LOCK_ICON} from './IconTags'

const ScoreButton = function (props) {
    return (
        <button
            className={`btn score-btn ${props.isScored ? 'score-btn-scored' : ""}`}
            onClick={(event) => props.handleScoreButtonClick(event, props.color, props.display)}
            disabled={!props.isClickable}>
            {props.display === "lock" ? SVG_LOCK_ICON : props.display}
        </button>
    )
}

export default ScoreButton