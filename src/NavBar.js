import React from "react"

const NavBar = function () {
    return (

        <ul className="nav nav-fill justify-content-end quixx-nav bg-quixx-orange">
            <h1 className="nav-title">Quixx</h1>
            <li className="nav-item">
                <a role="button" className="nav-link" href="#"><img src="arrow-repeat.svg"></img></a>
            </li>
            <li className="nav-item">
                <a role="button" className="nav-link" href="#"><img src="question-circle.svg"></img></a>
            </li>
        </ul>
    )
}

export default NavBar