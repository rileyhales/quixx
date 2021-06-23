import React from "react"

import "./MenuGroup.css"


const MenuGroup = (props) => {
    const skipCheckboxes = props.state.skips.map(
        (value, index) => {
            return <input
                key={`skip${index}`}
                className={"skip-checkbox"}
                type={"checkbox"}
                checked={value}
                onChange={() => props.click(index)}
                aria-label={"Skip turn marker"}/>
        })
    const scoreBoxes = Object.keys(props.scores).map((color, index) => {
        return (
            <div key={index}
                 className={`score-total bg-quixx-${color}`}>
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
        </div>
    )
};

export default MenuGroup