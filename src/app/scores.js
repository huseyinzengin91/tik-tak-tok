import React from "react";
import { SCREEN, GAME } from "./constants";

class Scores extends React.Component {
  constructor(props) {
    super(props);
    this.scoreHistory = this.getScoreData();
  }

  getScoreData() {
    let returnValue = { highScore: 0, scores: [], username: "" };
    let history = localStorage.getItem(GAME.LOCAL_DATA);
    if (history !== null) {
      let json = JSON.parse(history);
      returnValue.highScore = json.highScore !== undefined ? json.highScore : 0;
      returnValue.scores = json.scores !== undefined ? json.scores : 0;
      returnValue.username = json.username !== undefined ? json.username : "";
    }

    return returnValue;
  }

  render() {
    return (
      <div className="no-select" style={{ color: "#fff", textAlign: "center" }}>
        <h1>Scores</h1>
        <h2>HighScore {this.scoreHistory.highScore}</h2>

        {this.scoreHistory.scores.reverse().map((value, index) => {
          return <h3 key={index}>{value}</h3>;
        })}

        <button
          className="home-btn"
          type="button"
          onClick={() => this.props.setScreen(SCREEN.LOBBY)}
        >
          Home
        </button>
      </div>
    );
  }
}

export default Scores;
