import React from "react"

import "./MenuGroup.css"

import alarm from "./icons/alarm.svg"
import dice from "./icons/dice-6.svg"
import glasses from "./icons/eyeglasses.svg"
import skip from "./icons/skip-end.svg"

export default function MenuGroup({state, scores, click}) {
    const trixxIcons = [alarm, dice, glasses, skip]
    const skipCheckboxes = state.skips.map(
      (value, index) => {
          return (
            <label key={index} className={"btn-sizes skip-label"}>
                <input className={"btn-sizes skip-input"}
                       type={"checkbox"}
                       checked={value}
                       onChange={() => click(index)}
                       aria-label={"Skip turn marker"}/>
                <span className={`skip-style-span btn-sizes`}>
                    {state.trixx ? <img src={trixxIcons[index]} alt={"powerup icon"}></img> : "X"}
                </span>
            </label>
          )
      })
    const scoreBoxes = Object.keys(scores).map((color, index) => {
        return (
          <div key={index} className={`score-total btn-sizes bg-quixx-${color}-score`}>
              {scores[color]}
          </div>
        )
    })
    return (
      <div className={"score-group menu-group bg-quixx-grey"}>
          <div className={"menu-label"}>{state.trixx ? "Powers" : "Skip"}</div>
          {skipCheckboxes}
          <hr/>
          <div className={"menu-label"}>Score</div>
          {scoreBoxes}
      </div>
    )
};

MenuGroup.defaultProps = {
    trixx: true
}

