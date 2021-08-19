import React, {useState, useEffect, lazy} from "react"

import LoadingScreen from "./LoadingScreen"
import GameStates from "./GameStates";

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

const groupList = ["g1", "g2", "g3", "g4"]

const Quixx = () => {
    const [gameState, setGameState] = useState(GameStates.quixx())
    const [gameBoard, setGameBoard] = useState('Quixx')
    const [scores, setScores] = useState(JSON.parse(JSON.stringify(scoresTemplate)))
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    const restart = () => {
        switch (gameBoard) {
            case "q1":
                setGameState(GameStates.quixx())
                break
            case "q2":
                setGameState(GameStates.quixxMixxNumbers())
                break
            case "q3":
                setGameState(GameStates.quixxMixxColors())
                break
            case "q4":
                setGameState(GameStates.sequential())
                break
            default:
                setGameState(GameStates.quixx())
        }
    }
    const skip = (index) => {
        setGameState((lastState) => {
            let newState = JSON.parse(JSON.stringify(lastState))
            newState.undoState = JSON.parse(JSON.stringify(lastState))
            newState.skips[index] = !newState.skips[index]
            return newState
        })
    }
    const redo = () => {
        if (gameState.redoState === null) return
        setGameState(currentState => {
            let newState = JSON.parse(JSON.stringify(currentState))
            // cache a clone of the current state as the state to "undo"
            newState.redoState.undoState = JSON.parse(JSON.stringify(currentState))
            return currentState.redoState
        })
    }
    const undo = () => {
        if (gameState.undoState === null) return
        setGameState(currentState => {
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
    const scoreButton = function (targetColor, targetNumber) {
        setGameState((currentState) => {
            let newState = JSON.parse(JSON.stringify(currentState))
            newState.undoState = JSON.parse(JSON.stringify(currentState))
            newState.redoState = null
            // figure out which index in the scoring/clickable arrays we're on
            const targetIndex = newState[targetColor].order.indexOf(targetNumber)
            // toggle the scored status of the button
            newState[targetColor].scored[targetIndex] = !(newState[targetColor].scored[targetIndex])
            // figure out what buttons should be clickable
            const indexOfHighestScoredBox = newState[targetColor].scored.lastIndexOf(true)
            // buttons lower than the one pressed are disabled
            newState[targetColor].canClick = newState[targetColor].canClick.map((element, index) => {
                return !(index < indexOfHighestScoredBox)
            })
            // can only click 11th button (12 or 2) if the number of other buttons scored is 5 or more
            newState[targetColor].canClick[10] = newState[targetColor].scored.filter(Boolean).length >= 5 && !newState[targetColor].scored[11];
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
        if (stateFromLocalStorage !== null) setGameState(stateFromLocalStorage)
    }, [])

    useEffect(() => {
        setScores(() => {
            const scoreG1 = computeScore(gameState.g1.scored)
            const scoreG2 = computeScore(gameState.g2.scored)
            const scoreG3 = computeScore(gameState.g3.scored)
            const scoreG4 = computeScore(gameState.g4.scored)
            const scoreSkips = gameState.skips.filter(Boolean).length * -5
            return {
                blu: scoreG1,
                gre: scoreG2,
                yel: scoreG3,
                red: scoreG4,
                skips: scoreSkips,
                total: scoreG1 + scoreG2 + scoreG3 + scoreG4 + scoreSkips
            }
        })
        cacheState(gameState)
    }, [gameState,])

    useEffect(() => {
        restart()
    }, [gameBoard])

    return (
        <React.Suspense fallback={<LoadingScreen message={"Loading App..."}/>}>
            <div className={"app-container"}>
                <TitleBar restart={restart} undo={undo} redo={redo} isFullScreen={isFullScreen} goFullscreen={goFullscreen} toggleModal={toggleModal} state={gameState}/>
                <div className={"scores"}>
                    {groupList.map((color, index) => <ScoreGroup key={index} state={gameState[color]} color={color} click={scoreButton}/>)}
                    <MenuGroup state={gameState} click={skip} scores={scores}/>
                </div>
                <OptionsModal modalVisible={modalVisible} toggleModal={toggleModal} setGameBoard={setGameBoard}/>
            </div>
        </React.Suspense>
    )
}

export default Quixx
