import React, {useState, Suspense, lazy} from "react"

import LoadingScreen from "./LoadingScreen"

import {useBoardConfigContext} from "./Contexts/BoardContext";

import "./Quixx.css"

const TitleBar = lazy(() => import("./TitleBar"))
const ScoreGroups = lazy(() => import("./Components/ScoreGroups/ScoreGroups"))
const MenuGroup = lazy(() => import("./MenuGroup"))
const BoardMenu = lazy(() => import("./Components/Modals/BoardSwitcher"))
const HelpMenu = lazy(() => import("./Components/Modals/HelpMenu"))


const Quixx = () => {
    const Board = useBoardConfigContext()
    const [modalVisibleBoard, setModalVisibleBoard] = useState(false)
    const [modalVisibleHelp, setModalVisibleHelp] = useState(false)

    const showBoardMenu = () => setModalVisibleBoard(prevState => !prevState)
    const showHelpModal = () => setModalVisibleHelp(prevState => !prevState)

    return (
      <Suspense fallback={<LoadingScreen message={"Loading App..."}/>}>
          <div className={"app-container"}>
              <TitleBar showBoardMenu={showBoardMenu} showHelpModal={showHelpModal}/>
              <div className={"scores"}>
                  <ScoreGroups/>
                  <MenuGroup state={Board.state} click={Board.skip} scores={Board.score}/>
              </div>
              <BoardMenu visible={modalVisibleBoard} setVisible={setModalVisibleBoard}/>
              <HelpMenu visible={modalVisibleHelp} setVisible={setModalVisibleHelp} title={"Help"}/>
          </div>
      </Suspense>
    )
}

export default Quixx
