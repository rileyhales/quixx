import React from "react"

import "./OptionsModal.css"

const OptionsModal = function (props) {
    return (
        <div className={`modal-wrapper ${props.modalVisible ? "show" : "hide"}`}>
            <div className={"modal-content"}>
                <div className={"modal-head"}>
                    <h2 className={"modal-title"}>Change Game Boards</h2>
                </div>

                <div className={"modal-body"}>
                    <button className={"modal-button"} onClick={() => {props.setGameBoard("q1"); props.toggleModal()}}>Quixx</button>
                    <button className={"modal-button"} onClick={() => {props.setGameBoard("q2"); props.toggleModal()}}>Quixx Mixx Numbers</button>
                    <button className={"modal-button"} onClick={() => {props.setGameBoard("q3"); props.toggleModal()}}>Quixx Mixx Colors</button>
                    <button className={"modal-button"} onClick={() => {props.setGameBoard("q4"); props.toggleModal()}}>Sequential Colors</button>
                </div>

                <div className={"modal-footer"}>
                    <button className={"modal-button"} onClick={() => {props.toggleModal()}}>Close Modal</button>
                </div>
            </div>
        </div>
    )

}

export default OptionsModal