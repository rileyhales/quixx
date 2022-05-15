import React, {lazy} from "react";
import {useBoardConfigContext} from "../../Contexts/BoardContext";

const Modal = lazy(() => import("../Modal/Modal"))

export default function BoardMenu({visible, setVisible}) {
    const Board = useBoardConfigContext()

    return (
      <Modal visible={visible} setVisible={setVisible} title={"Change Boards"}>
          <>
              <div className={"modal-body-divider"}>Original</div>
              <button className={`board-btn ${Board.state.id === 1 ? "active-board" : ""}`} onClick={() => {Board.change(1); setVisible(false)}}>Quixx</button>
              <div className={"modal-body-divider"}>Quixx Mixx Expansion Pack</div>
              <button className={`board-btn ${Board.state.id === 2 ? "active-board" : ""}`} onClick={() => {Board.change(2); setVisible(false)}}>Quixx Mixx Numbers</button>
              <button className={`board-btn ${Board.state.id === 3 ? "active-board" : ""}`} onClick={() => {Board.change(3); setVisible(false)}}>Quixx Mixx Colors</button>
              <div className={"modal-body-divider"}>Quixx Trixx - Party Mode</div>
              <button className={`board-btn ${Board.state.id === 4 ? "active-board" : ""}`} onClick={() => {Board.change(4); setVisible(false)}}>Quixx Trixx</button>
              <button className={`board-btn ${Board.state.id === 5 ? "active-board" : ""}`} onClick={() => {Board.change(5); setVisible(false)}}>Quixx - 2 Skips</button>
              <button className={`board-btn ${Board.state.id === 6 ? "active-board" : ""}`} onClick={() => {Board.change(6); setVisible(false)}}>Sequential Colors</button>
              <div className={"modal-body-divider"}>Random Boards</div>
              <button className={`board-btn ${Board.state.id === 7 ? "active-board" : ""}`} onClick={() => {Board.change(7); setVisible(false)}}>Random Numbers</button>
              <button className={`board-btn ${Board.state.id === 8 ? "active-board" : ""}`} onClick={() => {Board.change(8); setVisible(false)}}>Random Colors</button>
              <button className={`board-btn ${Board.state.id === 9 ? "active-board" : ""}`} onClick={() => {Board.change(9); setVisible(false)}}>Random Numbers and Colors</button>
          </>
      </Modal>
    )
}