import React from "react"
import ScoreGroup from "./ScoreGroup";

class ScoreCard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div key={"scorecard"} className="score-card">
                <ScoreGroup order="descending" color="blue" />
                <ScoreGroup order="descending" color="green" />
                <ScoreGroup order="ascending" color="yellow" />
                <ScoreGroup order="ascending" color="red" />
            </div>
        )
    }
}

export default ScoreCard