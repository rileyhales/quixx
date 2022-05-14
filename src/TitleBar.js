import React, {lazy, useState} from "react"

import "./TitleBar.css"
import {useBoardConfigContext} from "./Contexts/BoardContext";

const BoardSwitcher = lazy(() => import("./Components/Modals/BoardSwitcher"))

const navBtnCls = "nav-btn"

const TitleBar = ({showBoardMenu, showHelpModal}) => {
    const Board = useBoardConfigContext()

    const [fullScreen, setFullScreen] = useState(false)

    const goFullscreen = () => {
        if (document.fullscreenElement !== null) {
            document.exitFullscreen()
            setFullScreen(false)
        } else {
            document.getElementById("root").requestFullscreen()
            setFullScreen(true)
        }
    }

    return (
      <>
          <BoardSwitcher/>
          <div className={"header"}>
              <div className={"header-container"}>
                  <div className={"title"}>Quixx</div>
                  <button className={navBtnCls} onClick={() => Board.undo()} disabled={!Boolean(Board.state.undoState)}>
                      <img alt="Undo Button" src={process.env.PUBLIC_URL + "/arrow-counterclockwise.svg"}/>
                  </button>
                  <button className={navBtnCls} onClick={() => Board.redo()} disabled={!Boolean(Board.state.redoState)}>
                      <img alt="Redo Button" src={process.env.PUBLIC_URL + "/arrow-clockwise.svg"}/>
                  </button>
                  <button className={navBtnCls} onClick={() => Board.clear()}>
                      <img alt="Restart Button" src={process.env.PUBLIC_URL + "/arrow-repeat.svg"}/>
                  </button>
                  <button className={navBtnCls} onClick={() => showBoardMenu()}>
                      <img alt="Toggle Board" src={process.env.PUBLIC_URL + "/gameboard.svg"}/>
                  </button>
                  <button className={navBtnCls} onClick={() => showHelpModal()}>
                      <img alt="Toggle Instructions" src={process.env.PUBLIC_URL + "/help.svg"}/>
                  </button>
                  <button className={navBtnCls} onClick={() => goFullscreen()}>
                      {
                          fullScreen ?
                            <img alt="Minimize Screen Button" src={process.env.PUBLIC_URL + "/minimize.svg"}/> :
                            <img alt="Full Screen Button" src={process.env.PUBLIC_URL + "/fullscreen.svg"}/>
                      }
                  </button>
              </div>
          </div>
      </>
    )
}

export default TitleBar