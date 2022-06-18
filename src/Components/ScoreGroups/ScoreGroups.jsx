import React from "react"

import "./ScoreGroups.css"
import ScoreColumn from "./ScoreColumn";
import {useBoardConfigContext} from "../../Contexts/BoardContext";

const ScoreGroups = () => {
    const Boards = useBoardConfigContext()
    return (
      <>
          {['g1', 'g2', 'g3', 'g4'].map(group => <ScoreColumn key={`${Boards.id}-${group}`} groupJSON={Boards.state[group]} groupID={group} click={Boards.score}/>)}
      </>
    )
}

export default ScoreGroups