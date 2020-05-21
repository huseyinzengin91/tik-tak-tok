import React from "react";
import chick from "./../assets/chick.svg";
import {SCREEN} from "./constants";

class GameOver extends React.Component {
  render() {
    return (
      <div
        style={{
          color: "#fff",
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "700",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img alt="" src={chick} width="72" height="72"/>
        Game over {this.props.username} <br /> Your Score: {this.props.score}
        <button type="button" className="game-over-home-btn" onClick={() => this.props.setScreen(SCREEN.LOBBY)}>Home</button>
      </div>
    );
  }
}

export default GameOver;
