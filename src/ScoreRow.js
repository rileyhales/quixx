import React from "react";

import ScoreButton from "./ScoreButton";

class ScoreRow extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let scorebuttons = []
        for (let i = 2; i <= 12; i++) {
            scorebuttons.push(<ScoreButton key={`${this.props.color}${i}`} display={i} color={this.props.color} />)
        }
        if (this.props.order === "descending") {
            scorebuttons = scorebuttons.reverse();
        }
        scorebuttons.push(<ScoreButton key={`${this.props.color}lock`} display={"lock"} color={this.props.color} />)

        return (
            <div key={`score-row-${this.props.color}`} className={`score-col bg-quixx-${this.props.color}`}>
                {scorebuttons}
            </div>
        )
    }
}

export default ScoreRow