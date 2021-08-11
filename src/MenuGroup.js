import React from "react"

import "./MenuGroup.css"


const MenuGroup = (props) => {
    const skipCheckboxes = props.state.skips.map(
        (value, index) => {
            return (
                <label key={index} className={"skip-label button-sizes"}>
                    <input className={"button-sizes skip-input"}
                           type={"checkbox"}
                           checked={value}
                           onChange={() => props.click(index)}
                           aria-label={"Skip turn marker"}/>
                    <span className={`skip-style-span button-sizes`}>
                        {index === 0 ? "S" : index === 1 ? "K" : index === 2 ? "I" : "P"}
                    </span>
                </label>

            )
        })
    const scoreBoxes = Object.keys(props.scores).map((color, index) => {
        return (
            <div key={index}
                 className={`score-total button-sizes bg-quixx-${color}-score`}>
                {props.scores[color]}
            </div>
        )
    })
    return (
        <div className={"score-group menu-group bg-quixx-grey"}>
            <div className={"menu-label"}>Skip</div>
            {skipCheckboxes}
            <hr/>
            <div className={"menu-label"}>Score</div>
            {scoreBoxes}
            <hr/>
            <div><a href={"https://rileyhales.com"}>&copy;RCH</a></div>
            <div>v{process.env.REACT_APP_VERSION}</div>
        </div>
    )
};

export default MenuGroup