import React from "react"

import "./TitleBar.css"

const TitleBar = (props) => {
    return (
        <div className={"header"}>
            <div className={"header-spacer"}>
                <div className={"title"}>Quixx</div>
                <div className={"game-button-container"}>
                    <button className={"game-button"} onClick={() => props.undo()} disabled={!Boolean(props.state.undoState)}>
                        <img alt="Undo Button" src={process.env.PUBLIC_URL + "/arrow-counterclockwise.svg"}/>
                    </button>
                    <button className={"game-button"} onClick={() => props.redo()} disabled={!Boolean(props.state.redoState)}>
                        <img alt="Redo Button" src={process.env.PUBLIC_URL + "/arrow-clockwise.svg"}/>
                    </button>
                    <button className={"game-button"} onClick={() => props.restart()}>
                        <img alt="Restart Button" src={process.env.PUBLIC_URL + "/arrow-repeat.svg"}/>
                    </button>
                    <button className={"game-button"} onClick={() => props.goFullscreen()}>
                        <img alt="Full Screen Button" src={process.env.PUBLIC_URL + "/fullscreen.svg"}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TitleBar