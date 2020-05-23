import React from "react";
import { GAME } from "../constants";

import dagger from "./../../assets/dagger.svg";

class DaggerObject extends React.Component {
  render() {
    return (
      <img
        alt=""
        className="dagger no-select"
        src={dagger}
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

export default DaggerObject;
