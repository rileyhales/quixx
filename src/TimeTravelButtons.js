import React from "react"
import {SVG_UNDO_ICON, SVG_REDO_ICON} from "./IconTags";

const TimeTravelButtons = function (props) {
    return (
        <div className={"ttravel-button-group"}>
            <button className={"btn ttravel-btn"} onClick={props.handleUndoButtonClick} disabled={!props.canUndo}>{SVG_UNDO_ICON}</button>
            <button className={"btn ttravel-btn"} onClick={props.handleRedoButtonClick} disabled={!props.canRedo}>{SVG_REDO_ICON}</button>
        </div>
    )
}

export default TimeTravelButtons