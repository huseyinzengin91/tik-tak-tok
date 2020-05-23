import React from "react";
import { GAME } from "../constants";

import heart from "./../../assets/heart.svg";

class HeartObject extends React.Component {
  render() {
    return (
      <img
        alt=""
        className="heart no-select"
        src={heart}
        width={GAME.OBJECT_SIZE}
        style={{
          position: "absolute",
          left: this.props.position.x,
          top: this.props.position.y,
        }}
      />
    );
  }
}

export default HeartObject;
