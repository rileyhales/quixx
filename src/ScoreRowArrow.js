import React from "react";
import {SVG_CARET_ICON} from "./IconTags"

const ScoreRowArrow = function () {
    return (
        <button className={`btn score-btn score-btn-arrow`} disabled={true}>
            {SVG_CARET_ICON}
        </button>
    )
}

export default ScoreRowArrow