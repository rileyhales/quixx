import React from "react";

const ScoreRowArrow = function () {
    return (
        <button className={`btn score-btn score-btn-arrow`} disabled={true}>
            <img alt="Start direction arrow" src="caret-right-fill.svg"></img>
        </button>
    )
}

export default ScoreRowArrow