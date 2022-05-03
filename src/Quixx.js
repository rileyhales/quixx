import React, {useState, useEffect, lazy} from "react"

import LoadingScreen from "./LoadingScreen"
import Boards from "./Boards/Boards";

import {useAppConfigContext} from "./Contexts/AppContext";
import BoardMenu from "./Components/ModalMenus/BoardSwitcher";

import "./Quixx.css"

const TitleBar = lazy(() => import("./TitleBar"))
const ScoreGroups = lazy(() => import("./Components/ScoreGroups/ScoreGroups"))
const MenuGroup = lazy(() => import("./MenuGroup"))


const Quixx = () => {
    const Configs = useAppConfigContext()
    const [scores, setScores] = useState(JSON.parse(JSON.stringify(Boards.scores)))
    const [fullScreen, setFullScreen] = useState(false)
    const [modalVisibleBoard, setModalVisibleBoard] = useState(false)
    const [modalVisibleHelp, setModalVisibleHelp] = useState(false)

    const skip = (index) => {
        Configs.setGameState((lastState) => {
            let newState = JSON.parse(JSON.stringify(lastState))
            newState.undoState = JSON.parse(JSON.stringify(lastState))
            newState.skips[index] = !newState.skips[index]
            return newState
        })
    }
    const redo = () => {
        if (Configs.gameState.redoState === null) return
        Configs.setGameState(currentState => {
            let newState = JSON.parse(JSON.stringify(currentState))
            // cache a clone of the current state as the state to "undo"
            newState.redoState.undoState = JSON.parse(JSON.stringify(currentState))
            return currentState.redoState
        })
    }
    const undo = () => {
        if (Configs.gameState.undoState === null) return
        Configs.setGameState(currentState => {
            let newState = JSON.parse(JSON.stringify(currentState.undoState))
            newState.redoState = JSON.parse(JSON.stringify(currentState))
            return newState
        })
    }
    const goFullscreen = () => {
        if (document.fullscreenElement !== null) {
            document.exitFullscreen()
            setFullScreen(false)
        } else {
            document.getElementById("root").requestFullscreen()
            setFullScreen(true)
        }
    }
    const computeScore = (scoredList) => {
        // computes score for a list of boolean scored/true and notScored/false values
        let count = scoredList.filter(Boolean).length
        // if the lock button (11th position) is scored and the 12/2 (10th position) is not, the lock button doesn't count for points
        if (!scoredList[10] && scoredList[11]) count -= 1
        return count * (count + 1) / 2
    }
    const showBoardMenu = () => setModalVisibleBoard(prevState => !prevState)
    const showHelpModal = () => setModalVisibleHelp(prevState => !prevState)

    return (
      <React.Suspense fallback={<LoadingScreen message={"Loading App..."}/>}>
          <div className={"app-container"}>
              <TitleBar undo={undo}
                        redo={redo}
                        isFullScreen={fullScreen}
                        goFullscreen={goFullscreen}
                        showBoardMenu={showBoardMenu}
                        showHelpModal={showHelpModal}/>
              <div className={"scores"}>
                  <ScoreGroups/>
                  <MenuGroup state={Configs.gameState} click={skip} scores={scores}/>
              </div>
              <BoardMenu visible={modalVisibleBoard} setVisible={setModalVisibleBoard}/>
              {/*<Modal visible={modalVisibleHelp} setVisible={setModalVisibleHelp} title={"Help"}>*/}
              {/*    <>*/}
              {/*        <div className={"modal-body-divider"}>Powers</div>*/}
              {/*        <div>Time Travel: Score a number you previously skipped</div>*/}
              {/*        <div>Re-roll: Re-roll any number of die, but only 1 time</div>*/}
              {/*        <div>Color Blind: Score with any two die on any color group</div>*/}
              {/*        <div>Skip: Skip your turn</div>*/}
              {/*    </>*/}
              {/*</Modal>*/}
          </div>
      </React.Suspense>
    )
}

export default Quixx
