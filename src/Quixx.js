import React from "react";

import ScoreCard from "./ScoreCard";

class Quixx extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>

                <ScoreCard />
            </div>
        )
    }
}

export default Quixx
