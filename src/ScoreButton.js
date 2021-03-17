import React from 'react';

const ScoreButton = function (props) {
    // console.log(props)
    let className = `btn score-btn txt-quixx-${props.color}`;
    let content;
    if (props.display === "arrow") {
        content = <img alt="Start direction arrow" src="caret-right-fill.svg"></img>
        className += " score-btn-arrow"
        return <button className={className} disabled={true}>{content}</button>
    } else if (props.display === "lock") {
        content = <img alt="Lock group icon" src="lock-fill.svg"></img>
    } else {
        content = props.display
    }
    return <button id={props.id} className={className} onClick={props.handleScoreButtonClick}>{content}</button>
}

export default ScoreButton