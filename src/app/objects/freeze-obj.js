import React from "react";
import { GAME } from "../constants";

import freeze from "./../../assets/freeze.svg";

class FreezeObject extends React.Component {
  render() {
    return (
      <img
        alt=""
        className="freeze no-select"
        src={freeze}
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

export default FreezeObject;