import React from "react";

import NavBar from "./NavBar";
import ScoreCard from "./ScoreCard";
import ScoreTotals from "./ScoreTotals";

class Quixx extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <NavBar />
                <ScoreCard />
                <ScoreTotals />
            </div>
        )
    }
}

export default Quixx
