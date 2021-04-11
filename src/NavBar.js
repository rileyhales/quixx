import React from "react"
import NavButtons from "./NavButtons";

const NavBar = function (props) {
    return (
        <nav className="nav nav-fill quixx-nav bg-quixx-orange">
            <h1 className="nav-title">Quixx</h1>
            <NavButtons
                canUndo={props.canUndo}
                canRedo={props.canRedo}
                handleUndoButtonClick={props.handleUndoButtonClick}
                handleRedoButtonClick={props.handleRedoButtonClick}
                handleRestartButtonClick={props.handleRestartButtonClick}/>
        </nav>
    )
}

export default NavBar