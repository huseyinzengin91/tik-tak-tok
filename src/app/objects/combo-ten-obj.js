import React from "react";
import { GAME } from "../constants";

import ten from "./../../assets/ten.svg";

class ComboTenObject extends React.Component {
  render() {
    return (
      <img
        alt=""
        className="comboTen no-select"
        src={ten}
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

export default ComboTenObject;
