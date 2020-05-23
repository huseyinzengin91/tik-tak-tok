import React from "react";
import { GAME } from "../constants";

import fifty from "./../../assets/fifty.svg";

class ComboFiftyObject extends React.Component {
  render() {
    return (
      <img
        alt=""
        className="comboFifty no-select"
        src={fifty}
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

export default ComboFiftyObject;
