import React from "react"
import {SVG_UNDO_ICON, SVG_REDO_ICON, SVG_RESTART_ICON} from "./IconTags";

const NavButtons = function (props) {
    return (
        <div className={"nav-button-group"}>
            <button className={"btn nav-btn"} onClick={props.handleRestartButtonClick}>{SVG_RESTART_ICON}</button>
            <button className={"btn nav-btn"} onClick={props.handleRedoButtonClick} disabled={!props.canRedo}>{SVG_REDO_ICON}</button>
            <button className={"btn nav-btn"} onClick={props.handleUndoButtonClick} disabled={!props.canUndo}>{SVG_UNDO_ICON}</button>
        </div>
    )
}

export default NavButtons