import React from 'react';

const ScoreButton = function (props) {
    let className = `btn score-btn txt-quixx-${props.color}`;
    let content = (props.display === "lock" ? <img src="lock-fill.svg"></img> : props.display)
    return <button className={className}>{content}</button>
}

export default ScoreButton