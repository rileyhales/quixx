import React from 'react';

const ScoreButton = function (props) {
    let key = `${props.color}${props.display}`;
    let className = `btn btn-primary score-btn txt-quixx-${props.color}`;
    let content = (props.display === "lock" ? <img src="lock-fill.svg"></img> : props.display)
    return <button key={key} className={className}>{content}</button>
}

export default ScoreButton