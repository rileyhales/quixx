import React from "react"

import "./ScoreGroups.css"
import ScoreColumn from "./ScoreColumn";
import {useBoardConfigContext} from "../../Contexts/BoardContext";

// {Boards.groups.map((group, idx) => <ScoreGroup key={idx} state={Configs.gameState[group]} group={group} click={scoreButton}/>)}

const ScoreGroups = () => {
    const Boards = useBoardConfigContext()
    return (
      <>
          {['g1', 'g2', 'g3', 'g4'].map(group => <ScoreColumn key={`${Boards.id}-${group}`} groupJSON={Boards[group]} groupID={group} click={Boards.scoreButton}/>)}
      </>
    )
}

export default ScoreGroups