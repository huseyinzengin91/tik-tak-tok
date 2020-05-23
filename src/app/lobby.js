import React from "react";
import { SCREEN } from "./constants";
import chick from "./../assets/chick.svg";

class Lobby extends React.Component {
  goToLevelPage() {
    if (this.props.username.trim() !== "") this.props.setScreen(SCREEN.LEVEL);
  }

  render() {
    return (
      <div
        className="no-select"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <img
          className="no-select"
          src={chick}
          alt=""
          width="64"
          style={{ margin: "0 auto", padding: "10px 0" }}
        />
        <h3 className="lobby-label no-select">Enter the username</h3>

        <input
          name="username"
          type="text"
          placeholder="username"
          className="lobby-text-input"
          value={this.props.username}
          onChange={(e) => this.props.setUsername(e.target.value)}
        />
        <button
          className="lobby-button"
          type="button"
          onClick={() => this.goToLevelPage()}
        >
          Enter
        </button>
        <div
          style={{ height: "2px", background: "#45046a", margin: "5px 0px" }}
        ></div>
        <button
          className="lobby-button"
          type="button"
          onClick={() => this.props.setScreen(SCREEN.SCORES)}
        >
          Scores
        </button>
      </div>
    );
  }
}

export default Lobby;
