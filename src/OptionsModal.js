import React from "react"

import "./OptionsModal.css"

const buttonClass = "modal-btn"

const OptionsModal = function (props) {
    return (
        <div className={`modal-wrapper ${props.modalVisible ? "show" : "hide"}`}>
            <div className={"modal-content"}>
                <div className={"modal-head"}>
                    <h2 className={"modal-title"}>Change Game Boards</h2>
                </div>

                <div className={"modal-body"}>
                    <div className={"modal-body-divider"}>Original</div>
                    <button className={buttonClass} onClick={() => {props.setGameBoard("q1"); props.toggleModal()}}>Quixx</button>
                    <div className={"modal-body-divider"}>Quixx Mixx Expansion Pack</div>
                    <button className={buttonClass} onClick={() => {props.setGameBoard("q2"); props.toggleModal()}}>Quixx Mixx Numbers</button>
                    <button className={buttonClass} onClick={() => {props.setGameBoard("q3"); props.toggleModal()}}>Quixx Mixx Colors</button>
                    <div className={"modal-body-divider"}>Extra Games</div>
                    <button className={buttonClass} onClick={() => {props.setGameBoard("q4"); props.toggleModal()}}>Sequential Colors</button>
                    <button className={buttonClass} onClick={() => {props.setGameBoard("q5"); props.toggleModal()}}>Random Numbers</button>
                    <button className={buttonClass} onClick={() => {props.setGameBoard("q6"); props.toggleModal()}}>Quixx - 2 Skips</button>
                </div>

                <div className={"modal-footer"}>
                    <button className={"modal-btn"} onClick={() => {props.toggleModal()}}>Close Menu</button>
                </div>
            </div>
        </div>
    )

}

export default OptionsModal