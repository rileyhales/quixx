import React, {lazy} from "react"

import "./TitleBar.css"

const BoardSwitcher = lazy(() => import("./Components/ModalMenus/BoardSwitcher"))

const navBtnCls = "nav-btn"

const TitleBar = ({state, undo, redo, restart, showBoardMenu, showHelpModal, goFullscreen, isFullScreen}) => {
    return (
      <>
          <BoardSwitcher/>
          <div className={"header"}>
              <div className={"header-container"}>
                  <div className={"title"}>Quixx</div>
                  <button className={navBtnCls} onClick={() => undo()} disabled={!Boolean(state.undoState)}>
                      <img alt="Undo Button" src={process.env.PUBLIC_URL + "/arrow-counterclockwise.svg"}/>
                  </button>
                  <button className={navBtnCls} onClick={() => redo()} disabled={!Boolean(state.redoState)}>
                      <img alt="Redo Button" src={process.env.PUBLIC_URL + "/arrow-clockwise.svg"}/>
                  </button>
                  <button className={navBtnCls} onClick={() => restart()}>
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
                          isFullScreen ?
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