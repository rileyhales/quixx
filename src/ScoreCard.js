import React from "react"
import ScoreRow from "./ScoreRow";

class ScoreCard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div key={"scorecard"} className="score-card">
                <ScoreRow order="descending" color="blue" />
                <ScoreRow order="descending" color="green" />
                <ScoreRow order="ascending" color="yellow" />
                <ScoreRow order="ascending" color="red" />
            </div>
        )
    }
}

export default ScoreCard