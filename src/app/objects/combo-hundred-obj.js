import React from "react";
import { GAME } from "../constants";

import hundred from "./../../assets/hundred.svg";

class ComboHundredObject extends React.Component {
  render() {
    return (
      <img
        alt=""
        className="comboHundred no-select"
        src={hundred}
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

export default ComboHundredObject;
