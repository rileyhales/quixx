import React, {useState, useEffect, lazy} from "react"

import LoadingScreen from "./LoadingScreen"
import GameBoards from "./GameBoards";

import "./Quixx.css"
import "./quixx-colors.css"

const TitleBar = lazy(() => import("./TitleBar"))
const ScoreGroup = lazy(() => import("./ScoreGroup"))
const MenuGroup = lazy(() => import("./MenuGroup"))
const OptionsModal = lazy(() => import("./OptionsModal"))

const scoresTemplate = {
    blu: 0,
    gre: 0,
    yel: 0,
    red: 0,
    skips: 0,
    total: 0
}

const GROUPLIST = ["g1", "g2", "g3", "g4"]
const BOARDS = {
    q1: GameBoards.quixx,
    q2: GameBoards.quixxMixxNumbers,
    q3: GameBoards.quixxMixxColors,
    q4: GameBoards.sequential,
    q5: GameBoards.randomNum,
    q6: GameBoards.lessSkips
}

const Quixx = () => {
    const [gameScores, setGameScores] = useState(GameBoards.quixx())
    const [gameBoard, setGameBoard] = useState("q1")

    const [scores, setScores] = useState(JSON.parse(JSON.stringify(scoresTemplate)))
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    const restart = () => {
        setGameScores(currentState => {
            let newState = JSON.parse(JSON.stringify(currentState))
            GROUPLIST.forEach(group => {
                newState[group].scored = Array(...GameBoards.scored)
                newState[group].canClick = Array(...GameBoards.clickable)
            })
            return newState
        })
    }
    const changeBoards = () => {
        const newBoard = BOARDS[gameBoard]()
        setGameScores(currentState => {
            let newState = JSON.parse(JSON.stringify(currentState))
            GROUPLIST.forEach(group => {
                newState[group].color = newBoard[group].color
                newState[group].nums = newBoard[group].nums
            })
            newState.board = gameBoard
            return newState
        })
    }
    const skip = (index) => {
        setGameScores((lastState) => {
            let newState = JSON.parse(JSON.stringify(lastState))
            newState.undoState = JSON.parse(JSON.stringify(lastState))
            newState.skips[index] = !newState.skips[index]
            return newState
        })
    }
    const redo = () => {
        if (gameScores.redoState === null) return
        setGameScores(currentState => {
            let newState = JSON.parse(JSON.stringify(currentState))
            // cache a clone of the current state as the state to "undo"
            newState.redoState.undoState = JSON.parse(JSON.stringify(currentState))
            return currentState.redoState
        })
    }
    const undo = () => {
        if (gameScores.undoState === null) return
        setGameScores(currentState => {
            let newState = JSON.parse(JSON.stringify(currentState.undoState))
            newState.redoState = JSON.parse(JSON.stringify(currentState))
            return newState
        })
    }
    const goFullscreen = () => {
        if (document.fullscreenElement !== null) {
            document.exitFullscreen()
            setIsFullScreen(false)
        } else {
            document.getElementById("root").requestFullscreen()
            setIsFullScreen(true)
        }
    }
    const scoreButton = function (btnGroup, btnNumber) {
        setGameScores((currentState) => {
            let newState = JSON.parse(JSON.stringify(currentState))
            newState.undoState = JSON.parse(JSON.stringify(currentState))
            newState.redoState = null
            // figure out which index in the scoring/clickable arrays we're on
            const btnIndex = newState[btnGroup].nums.indexOf(btnNumber)
            // toggle the scored status of the button
            newState[btnGroup].scored[btnIndex] = !(newState[btnGroup].scored[btnIndex])
            // figure out what buttons should be clickable
            const indexOfHighestScoredBox = newState[btnGroup].scored.lastIndexOf(true)
            // buttons lower than the one pressed are disabled
            newState[btnGroup].canClick = newState[btnGroup].canClick.map((element, index) => {
                return !(index < indexOfHighestScoredBox)
            })
            // can only click 11th button (12 or 2) if the number of other buttons scored is 5 or more
            newState[btnGroup].canClick[10] = newState[btnGroup].scored.filter(Boolean).length >= 5 && !newState[btnGroup].scored[11];

            // End of game logic when a lock button is pressed
            // if (btnIndex === 11) {
            //     const numLocks = groupList.reduce((sum, group) => {
            //         return newState[group].scored[btnIndex] ? sum + 1 : sum
            //     }, 0)
            //     if (numLocks === 1 && newState[btnGroup].scored[btnIndex]) alert(`Remove the ${newState[btnGroup].color[btnIndex]} Dice`)
            //     if (numLocks === 2) alert("Game over")
            // }

            return newState
        })
    }
    const cacheState = (stateToCache) => {
        localStorage.setItem("quixx-react-state", JSON.stringify(stateToCache))
    }
    const computeScore = (scoredList) => {
        // computes score for a list of boolean scored/true and notScored/false values
        let count = scoredList.filter(Boolean).length
        // if the lock button (11th position) is scored and the 12/2 (10th position) is not, the lock button doesn't count for points
        if (!scoredList[10] && scoredList[11]) count -= 1
        return count * (count + 1) / 2
    }
    const toggleModal = () => {setModalVisible(prevState => {return !prevState})}

    useEffect(() => {
        const stateFromLocalStorage = JSON.parse(localStorage.getItem("quixx-react-state"))
        if (stateFromLocalStorage !== null) {
            setGameScores(stateFromLocalStorage)
            setGameBoard(stateFromLocalStorage.board)
        }
    }, [])

    useEffect(() => {
        console.log("state changes")
        setScores(() => {
            const scoreG1 = computeScore(gameScores.g1.scored)
            const scoreG2 = computeScore(gameScores.g2.scored)
            const scoreG3 = computeScore(gameScores.g3.scored)
            const scoreG4 = computeScore(gameScores.g4.scored)
            const scoreSkips = gameScores.skips.filter(Boolean).length * -5
            return {
                blu: scoreG1,
                gre: scoreG2,
                yel: scoreG3,
                red: scoreG4,
                skips: scoreSkips,
                total: scoreG1 + scoreG2 + scoreG3 + scoreG4 + scoreSkips
            }
        })
        cacheState(gameScores)
        console.log("cached state")
    }, [gameScores,])

    useEffect(() => {
        console.log("changing boards")
        changeBoards()
    }, [gameBoard])

    return (
        <React.Suspense fallback={<LoadingScreen message={"Loading App..."}/>}>
            <div className={"app-container"}>
                <TitleBar restart={restart}
                          undo={undo}
                          redo={redo}
                          isFullScreen={isFullScreen}
                          goFullscreen={goFullscreen}
                          toggleModal={toggleModal}
                          state={gameScores}/>
                <div className={"scores"}>
                    {GROUPLIST.map((group, index) => <ScoreGroup key={index} state={gameScores[group]} group={group} click={scoreButton}/>)}
                    <MenuGroup state={gameScores} click={skip} scores={scores}/>
                </div>
                <OptionsModal modalVisible={modalVisible} toggleModal={toggleModal} setGameBoard={setGameBoard}/>
            </div>
        </React.Suspense>
    )
}

export default Quixx
