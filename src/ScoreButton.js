import React from 'react';

const ScoreButton = function (props) {
    let className = `btn score-btn txt-quixx-${props.color}`;
    let content;
    if (props.display === "lock") {
        content = <img src="lock-fill.svg"></img>
    } else if (props.display === "arrow") {
        content = <img src="caret-right-fill.svg"></img>
        className += " score-btn-arrow"
    } else {
        content = props.display
    }
    return <button className={className}>{content}</button>
}

export default ScoreButton