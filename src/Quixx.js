import React, {useState, useEffect, lazy} from "react"

import LoadingScreen from "./LoadingScreen"

import "./Quixx.css"
import "./quixx-colors.css"

const TitleBar = lazy(() => import("./TitleBar"))
const ScoreGroup = lazy(() => import("./ScoreGroup"))
const MenuGroup = lazy(() => import("./MenuGroup"))

const scoresTemplate = {
    blu: 0,
    gre: 0,
    yel: 0,
    red: 0,
    skips: 0,
    total: 0
}

const gameStateTemplate = () => {
    const buttonCount = 12
    const numSkips = 4
    const ascendOrder = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "lock"]
    const descendOrder = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, "lock"]
    const clickable = [true, true, true, true, true, true, true, true, true, true, false, true]
    return {
        undoState: null,
        redoState: null,
        blu: {
            scored: Array(buttonCount).fill(false),
            canClick: Array(...clickable),
            order: descendOrder
        },
        gre: {
            scored: Array(buttonCount).fill(false),
            canClick: Array(...clickable),
            order: descendOrder
        },
        yel: {
            scored: Array(buttonCount).fill(false),
            canClick: Array(...clickable),
            order: ascendOrder
        },
        red: {
            scored: Array(buttonCount).fill(false),
            canClick: Array(...clickable),
            order: ascendOrder
        },
        skips: Array(numSkips).fill(false),
    }
}

const Quixx = () => {
    const [gameState, setGameState] = useState(gameStateTemplate())
    const [scores, setScores] = useState(JSON.parse(JSON.stringify(scoresTemplate)))
    const [isFullScreen, setIsFullScreen] = useState(false)

    const restart = () => {
        setGameState(gameStateTemplate())
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
            newState[targetColor].canClick = newState[targetColor].canClick.map((element, index) => {
                return !(index < indexOfHighestScoredBox)
            })
            // can only click 11th button (12 or 2) if the number of other buttons scored is 5 or more
            newState[targetColor].canClick[10] = newState[targetColor].scored.filter(Boolean).length >= 5;
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

    useEffect(() => {
        const stateFromLocalStorage = JSON.parse(localStorage.getItem("quixx-react-state"))
        if (stateFromLocalStorage !== null) setGameState(stateFromLocalStorage)
    }, [])

    useEffect(() => {
        setScores(() => {
            const scoreRed = computeScore(gameState.red.scored)
            const scoreYel = computeScore(gameState.yel.scored)
            const scoreGre = computeScore(gameState.gre.scored)
            const scoreBlu = computeScore(gameState.blu.scored)
            const scoreSkips = gameState.skips.filter(Boolean).length * -5
            return {
                blu: scoreBlu,
                gre: scoreGre,
                yel: scoreYel,
                red: scoreRed,
                skips: scoreSkips,
                total: scoreRed + scoreYel + scoreGre + scoreBlu + scoreSkips
            }
        })
        cacheState(gameState)
    }, [gameState,])

    return (
        <React.Suspense fallback={<LoadingScreen message={"Loading App..."}/>}>
            <div className={"app-container"}>
                <TitleBar restart={restart} undo={undo} redo={redo} isFullScreen={isFullScreen} goFullscreen={goFullscreen} state={gameState}/>
                <div className={"scores"}>
                    <ScoreGroup state={gameState} click={scoreButton} color={"blu"}/>
                    <ScoreGroup state={gameState} click={scoreButton} color={"gre"}/>
                    <ScoreGroup state={gameState} click={scoreButton} color={"yel"}/>
                    <ScoreGroup state={gameState} click={scoreButton} color={"red"}/>
                    <MenuGroup state={gameState} click={skip} scores={scores}/>
                </div>
            </div>
        </React.Suspense>
    )
}

export default Quixx
