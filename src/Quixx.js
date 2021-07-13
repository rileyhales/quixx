import React, {useState, useEffect, lazy} from "react";

import LoadingScreen from "./LoadingScreen";

import "./Quixx.css"
import "./quixx-colors.css"

const TitleBar = lazy(() => import("./TitleBar"))
const ScoreGroup = lazy(() => import("./ScoreGroup"))
const MenuGroup = lazy(() => import("./MenuGroup"))

const scoresTemplate = {
    red: 0,
    yel: 0,
    gre: 0,
    blu: 0,
    skips: 0,
    total: 0
}

const gameStateTemplate = () => {
    const buttonCount = 12
    const numSkips = 4
    const ascendOrder = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "lock"]
    const descendOrder = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, "lock"]
    const clickable = [true, true, true, true, true, true, true, true, true, true, false, false]
    return {
        undoState: null,
        redoState: null,
        red: {
            scored: Array(buttonCount).fill(false),
            canClick: Array(...clickable),
            order: ascendOrder
        },
        yel: {
            scored: Array(buttonCount).fill(false),
            canClick: Array(...clickable),
            order: ascendOrder
        },
        gre: {
            scored: Array(buttonCount).fill(false),
            canClick: Array(...clickable),
            order: descendOrder
        },
        blu: {
            scored: Array(buttonCount).fill(false),
            canClick: Array(...clickable),
            order: descendOrder
        },
        skips: Array(numSkips).fill(false),
    }
}

const Quixx = () => {
    const [gameState, setGameState] = useState(gameStateTemplate())
    const [scores, setScores] = useState(JSON.parse(JSON.stringify(scoresTemplate)))

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
        if (document.fullscreenElement) {
            document.exitFullscreen()
        } else {
            document.getElementById("root").requestFullscreen()
        }
    }
    const computeScore = (count) => {
        return count * (count + 1) / 2
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
            // count if you can score 12/2 & the lock
            const numScored = newState[targetColor].scored.filter(Boolean).length
            if (numScored >= 5) {
                newState[targetColor].canClick[10] = true
                newState[targetColor].canClick[11] = true
            } else {
                newState[targetColor].canClick[10] = false
                newState[targetColor].canClick[11] = false
            }
            return newState
        })
    }
    const cacheState = (stateToCache) => {
        localStorage.setItem("quixx-react-state", JSON.stringify(stateToCache))
    }

    useEffect(() => {
        const stateFromLocalStorage = JSON.parse(localStorage.getItem("quixx-react-state"))
        if (stateFromLocalStorage !== null) setGameState(stateFromLocalStorage)
    }, [])

    useEffect(() => {
        setScores(() => {
            const scoreRed = computeScore(gameState.red.scored.filter(Boolean).length)
            const scoreYel = computeScore(gameState.yel.scored.filter(Boolean).length)
            const scoreGre = computeScore(gameState.gre.scored.filter(Boolean).length)
            const scoreBlu = computeScore(gameState.blu.scored.filter(Boolean).length)
            const scoreSkips = gameState.skips.filter(Boolean).length * -5
            return {
                red: scoreRed,
                yel: scoreYel,
                gre: scoreGre,
                blu: scoreBlu,
                skips: scoreSkips,
                total: scoreRed + scoreYel + scoreGre + scoreBlu + scoreSkips
            }
        })
        cacheState(gameState)
    }, [gameState,])

    return (
        <React.Suspense fallback={<LoadingScreen message={"Loading App..."}/>}>
            <div className={"app-container"}>
                <TitleBar restart={restart} undo={undo} redo={redo} goFullscreen={goFullscreen} state={gameState}/>
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
