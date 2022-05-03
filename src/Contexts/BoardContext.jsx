import React, {useContext} from "react"

import useLocalStorage from "../Hooks/useLocalStorage";
import Boards from "../Boards/Boards";

const BoardConfig = React.createContext()

export const useBoardConfigContext = () => {
    return useContext(BoardConfig)
}

export const BoardConfigProvider = ({children}) => {
    const [boardState, setBoardState] = useLocalStorage("quixx-state-2", Boards.quixx)

    const scoreButton = (btnGroup, btnNumber) => {
        setBoardState(currentState => {
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
            newState[btnGroup].canClick = newState[btnGroup].canClick.map((element, idx) => idx >= indexOfHighestScoredBox)
            // can only click 11th button (12 or 2) if the number of other buttons scored is 5 or more
            newState[btnGroup].canClick[10] = newState[btnGroup].scored.filter(Boolean).length >= 5 && !newState[btnGroup].scored[11];
            return newState
        })
    }

    useEffect(() => {
        setScores(() => {
            const scoreG1 = computeScore(Configs.gameState.g1.scored)
            const scoreG2 = computeScore(Configs.gameState.g2.scored)
            const scoreG3 = computeScore(Configs.gameState.g3.scored)
            const scoreG4 = computeScore(Configs.gameState.g4.scored)
            const scoreSkips = Configs.gameState.skips.filter(Boolean).length * (Configs.gameState.trixx ? -2 : -5)
            return {
                blu: scoreG1,
                gre: scoreG2,
                yel: scoreG3,
                red: scoreG4,
                skips: scoreSkips,
                total: scoreG1 + scoreG2 + scoreG3 + scoreG4 + scoreSkips
            }
        })
    }, [Configs.gameState,])

    const values = {
        boardState,
        setBoardState,
        scoreButton
    }
    return (
      <BoardConfig.Provider value={values}>
          {children}
      </BoardConfig.Provider>
    )
}