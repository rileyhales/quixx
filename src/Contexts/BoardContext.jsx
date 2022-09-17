import React, {useContext, useEffect, useState} from "react"

import useLocalStorage from "../Hooks/useLocalStorage";
import Boards from "../Boards/Boards";

const BoardConfig = React.createContext()

export const useBoardConfigContext = () => {
    return useContext(BoardConfig)
}

export const BoardConfigProvider = ({children}) => {
    const [boardState, setBoardState] = useLocalStorage("quixx-state-2", Boards.quixx)
    const [scores, setScores] = useState({
        blu: 0,
        gre: 0,
        yel: 0,
        red: 0,
        skips: 0,
        total: 0
    })

    const computeScore = (scoredList) => {
        // computes score for a list of boolean scored/true and notScored/false values
        let count = scoredList.filter(Boolean).length
        // if the lock button (11th position) is scored and the 12/2 (10th position) is not, the lock button doesn't count for points
        if (!scoredList[10] && scoredList[11]) count -= 1
        return count * (count + 1) / 2
    }


    const skip = (index) => {
        setBoardState((lastState) => {
            let newState = JSON.parse(JSON.stringify(lastState))
            newState.undoState = JSON.parse(JSON.stringify(lastState))
            newState.skips[index] = !newState.skips[index]
            return newState
        })
    }
    const redo = () => {
        if (boardState.redoState === null) return
        setBoardState(currentState => {
            let newState = JSON.parse(JSON.stringify(currentState))
            // cache a clone of the current state as the state to "undo"
            newState.redoState.undoState = JSON.parse(JSON.stringify(currentState))
            return currentState.redoState
        })
    }
    const undo = () => {
        if (boardState.undoState === null) return
        setBoardState(currentState => {
            let newState = JSON.parse(JSON.stringify(currentState.undoState))
            newState.redoState = JSON.parse(JSON.stringify(currentState))
            return newState
        })
    }
    const clear = () => {
        if (!window.confirm("Are you sure you want to reset your board?")) return
        setBoardState(currentState => {
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

    const change = ID => {
        const newBoard = Boards.lookup[ID]()
        setBoardState(currentState => {
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

    const score = (btnGroup, btnNumber) => {
        setBoardState(currentState => {
            let newState = JSON.parse(JSON.stringify(currentState))
            newState.undoState = JSON.parse(JSON.stringify(currentState))
            newState.redoState = null
            // figure out which index in the scoring/clickable arrays we're on
            const btnIndex = newState[btnGroup].nums.indexOf(btnNumber)
            // toggle the scored status of the button
            newState[btnGroup].scored[btnIndex] = !(newState[btnGroup].scored[btnIndex])
            // if the 10th button is scored, also automatically lock the column
            if (btnIndex === 10 && newState[btnGroup].scored[btnIndex]) newState[btnGroup].scored[11] = true
            // figure out what buttons should be clickable
            const indexOfHighestScoredBox = newState[btnGroup].scored.lastIndexOf(true)
            // buttons lower than the one pressed are disabled
            newState[btnGroup].canClick = newState[btnGroup].canClick.map((element, idx) => idx >= indexOfHighestScoredBox)
            // can only click 11th button (12 or 2) if the number of other buttons scored is 5 or more
            newState[btnGroup].canClick[10] = newState[btnGroup].scored.filter(Boolean).length >= 5 && !newState[btnGroup].scored[11];
            return newState
        })
    }

    useEffect(() => {
        setScores(() => {
            const scoreG1 = computeScore(boardState.g1.scored)
            const scoreG2 = computeScore(boardState.g2.scored)
            const scoreG3 = computeScore(boardState.g3.scored)
            const scoreG4 = computeScore(boardState.g4.scored)
            const scoreSkips = boardState.skips.filter(Boolean).length * (boardState.trixx ? -2 : -5)
            return {
                blu: scoreG1,
                gre: scoreG2,
                yel: scoreG3,
                red: scoreG4,
                skips: scoreSkips,
                total: scoreG1 + scoreG2 + scoreG3 + scoreG4 + scoreSkips
            }
        })
    }, [boardState,])

    const exports = {
        state: boardState,
        setState: setBoardState,
        scores: scores,
        undo,
        redo,
        skip,
        clear,
        change,
        score
    }
    return (
      <BoardConfig.Provider value={exports}>
          {children}
      </BoardConfig.Provider>
    )
}