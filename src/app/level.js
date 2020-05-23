import React from "react";
import { SCREEN, LEVEL } from "./constants";

class Level extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start: false,
      counter: 3,
    };
  }

  startGame() {
    this.setState({ start: true });
    let timer = setInterval(() => {
      this.setState({ counter: this.state.counter - 1 });
      if (this.state.counter === 0) {
        clearInterval(timer);
        this.props.setScreen(SCREEN.GAME_BOARD);
      }
    }, 1000);
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          verticalAlign: "center",
        }}
      >
        {!this.state.start ? (
          <div>
            <h2 className="level-label">Select Level</h2>

            <button
              className={
                "level-option " +
                (this.props.level === LEVEL.EASY ? "selected" : "")
              }
              onClick={() => this.props.setLevel(LEVEL.EASY)}
            >
              Easy
            </button>
            <button
              className={
                "level-option " +
                (this.props.level === LEVEL.MEDIUM ? "selected" : "")
              }
              onClick={() => this.props.setLevel(LEVEL.MEDIUM)}
            >
              Medium
            </button>

            <button className="level-start" onClick={() => this.startGame()}>
              Start
            </button>
          </div>
        ) : (
          <div>
            <span className="level-counter">{this.state.counter}</span>
          </div>
        )}
      </div>
    );
  }
}

export default Level;
