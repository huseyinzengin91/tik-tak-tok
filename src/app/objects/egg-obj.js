import React from "react";
import { GAME } from "../constants";

import egg from "./../../assets/egg.svg";

class EggObject extends React.Component {
  render() {
    return (
      <img
        alt=""
        className="egg no-select"
        src={egg}
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

export default EggObject;
