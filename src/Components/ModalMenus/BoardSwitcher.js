import React, {lazy} from "react";
import {useBoardConfigContext} from "../../Contexts/BoardContext";
import Boards from "../../Boards/Boards";

const Modal = lazy(() => import("../Modal/Modal"))

export default function BoardMenu({visible, setVisible}) {
    const BoardContext = useBoardConfigContext()

    const restart = () => {
        if (!window.confirm("Are you sure you want to reset your board?")) return
        BoardContext.setBoardState(currentState => {
            let newState = JSON.parse(JSON.stringify(currentState))
            Boards.groups.forEach(group => {
                newState.undoState = null
                newState.redoState = null
                newState[group].scored = Array(...Boards.scored)
                newState[group].scored = Array(...Boards.scored)
                newState[group].canClick = Array(...Boards.clickable)
                newState.skips = newState.skips.map(() => false)
            })
            return newState
        })
    }

    const changeBoards = ID => {
        const newBoard = Boards.lookup[ID]()
        BoardContext.setBoardState(currentState => {
            let newState = JSON.parse(JSON.stringify(currentState))
            Boards.groups.forEach(group => {
                newState.undoState = null
                newState.redoState = null
                newState[group].color = newBoard[group].color
                newState[group].nums = newBoard[group].nums
                newState.skips = newBoard.skips
                newState.trixx = newBoard.id === 4
                newState.id = newBoard.id
            })
            return newState
        })
    }

    return (
      <Modal visible={visible} setVisible={setVisible} title={"Change Boards"}>
          <>
              <button className={`board-btn`} onClick={() => {restart(false)}}>Quixx</button>
              <div className={"modal-body-divider"}>Original</div>
              <button className={`board-btn ${BoardContext.gameState.id === 1 ? "active-board" : ""}`} onClick={() => {changeBoards(1); setVisible(false)}}>Quixx</button>
              <div className={"modal-body-divider"}>Quixx Mixx Expansion Pack</div>
              <button className={`board-btn ${BoardContext.gameState.id === 2 ? "active-board" : ""}`} onClick={() => {changeBoards(2); setVisible(false)}}>Quixx Mixx Numbers</button>
              <button className={`board-btn ${BoardContext.gameState.id === 3 ? "active-board" : ""}`} onClick={() => {changeBoards(3); setVisible(false)}}>Quixx Mixx Colors</button>
              <div className={"modal-body-divider"}>Quixx Trixx - Party Mode</div>
              <button className={`board-btn ${BoardContext.gameState.id === 4 ? "active-board" : ""}`} onClick={() => {changeBoards(4); setVisible(false)}}>Quixx Trixx</button>
              <button className={`board-btn ${BoardContext.gameState.id === 5 ? "active-board" : ""}`} onClick={() => {changeBoards(5); setVisible(false)}}>Quixx - 2 Skips</button>
              <button className={`board-btn ${BoardContext.gameState.id === 6 ? "active-board" : ""}`} onClick={() => {changeBoards(6); setVisible(false)}}>Sequential Colors</button>
              <div className={"modal-body-divider"}>Random Boards</div>
              <button className={`board-btn ${BoardContext.gameState.id === 7 ? "active-board" : ""}`} onClick={() => {changeBoards(7); setVisible(false)}}>Random Numbers</button>
              <button className={`board-btn ${BoardContext.gameState.id === 8 ? "active-board" : ""}`} onClick={() => {changeBoards(8); setVisible(false)}}>Random Colors</button>
              <button className={`board-btn ${BoardContext.gameState.id === 9 ? "active-board" : ""}`} onClick={() => {changeBoards(9); setVisible(false)}}>Random Numbers and Colors</button>
          </>
      </Modal>
    )
}