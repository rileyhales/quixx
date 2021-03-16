import React from "react"
import ScoreRow from "./ScoreRow";

class ScoreCard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div key={"scorecard"} className="score-card">
                <ScoreRow order="ascending" color="red" />
                <ScoreRow order="ascending" color="yellow" />
                <ScoreRow order="descending" color="green" />
                <ScoreRow order="descending" color="blue" />
            </div>
        )
    }
}

export default ScoreCard