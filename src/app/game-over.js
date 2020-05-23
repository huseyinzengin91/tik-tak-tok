import React from "react";
import chick from "./../assets/chick.svg";
import { SCREEN } from "./constants";

class GameOver extends React.Component {
  render() {
    return (
      <div className="game-over">
        <img alt="" src={chick} width="72" height="72" />
        Game Over {this.props.username} <br /> Your Score: {this.props.score}
        <button
          type="button"
          className="home-btn"
          onClick={() => this.props.setScreen(SCREEN.LOBBY)}
        >
          Home
        </button>
      </div>
    );
  }
}

export default GameOver;
