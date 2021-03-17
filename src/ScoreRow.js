import React from "react";

import ScoreButton from "./ScoreButton";

class ScoreRow extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const sums = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let scorebuttons = sums.map(sum => <ScoreButton key={`${this.props.color}${sum}`} display={sum} color={this.props.color} />);
        if (this.props.order === "descending") {
            scorebuttons.reverse();
        }
        scorebuttons = [<ScoreButton key={`${this.props.color}arrow`} display="arrow" color={this.props.color} />, ].concat(scorebuttons)
        scorebuttons = scorebuttons.concat([<ScoreButton key={`${this.props.color}lock`} display="lock" color={this.props.color} />, ])

        return (
            <div key={`score-row-${this.props.color}`} className={`score-col bg-quixx-${this.props.color}`}>
                {scorebuttons}
            </div>
        )
    }
}

export default ScoreRow