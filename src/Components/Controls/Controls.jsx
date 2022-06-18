import React, {lazy, useState} from "react"

import "./Controls.css"
import {useBoardConfigContext} from "../../Contexts/BoardContext";

const HelpMenu = lazy(() => import("../Modals/HelpMenu"))

export default function Controls() {
    const Board = useBoardConfigContext()

    const [fullScreen, setFullScreen] = useState(false)
    const [modalVisibleHelp, setModalVisibleHelp] = useState(false)

    const goFullscreen = () => {
        if (document.fullscreenElement !== null) {
            document.exitFullscreen()
            setFullScreen(false)
        } else {
            document.getElementById("root").requestFullscreen()
            setFullScreen(true)
        }
    }

    const trixxIcons = ["hourglass-split", "dice-6", "palette", "incognito", "skip-end-fill"]
    const skipCheckboxes = Board.state.skips.map(
      (value, index) => {
          return (
            <label key={index} className={"btn-sizes skip-label"}>
                <input className={"btn-sizes skip-input"}
                       type={"checkbox"}
                       checked={value}
                       onChange={() => Board.skip(index)}
                       aria-label={"Skip turn marker"}/>
                <span className={`skip-style-span btn-sizes`}>
                    {Board.state.trixx ? <img src={process.env.PUBLIC_URL + "icons/" + trixxIcons[index] + ".svg"} alt={"powerup icon"}></img> : "X"}
                </span>
            </label>
          )
      })
    const scoreBoxes = Object.keys(Board.scores).map((color, index) => {
        return (
          <div key={index} className={`score-total btn-sizes bg-${color}-fade`}>
              {Board.scores[color]}
          </div>
        )
    })
    const navBtnCls = "nav-btn"

    return (
      <div>
          <div className={"menu-label"}>{Board.state.trixx ? "Powers" : "Skip"}</div>
          {skipCheckboxes}
          <hr/>

          <div className={"menu-label"}>Score</div>
          {scoreBoxes}

          <hr/>

          <button className={navBtnCls} onClick={() => goFullscreen()}>
              {
                  fullScreen ?
                  <img alt="Minimize Screen Button" src={process.env.PUBLIC_URL + "/icons/fullscreen-exit.svg"}/> :
                  <img alt="Full Screen Button" src={process.env.PUBLIC_URL + "/icons/arrows-fullscreen.svg"}/>
              }
          </button>
          <button className={navBtnCls} onClick={() => setModalVisibleHelp(true)}>
              <img alt="Toggle Instructions" src={process.env.PUBLIC_URL + "/icons/help.svg"}/>
          </button>
          <HelpMenu visible={modalVisibleHelp} setVisible={setModalVisibleHelp} title={"Help"}/>
      </div>
)
};

Controls.defaultProps = {
    trixx: true
}

