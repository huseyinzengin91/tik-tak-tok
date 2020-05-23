import React from "react";
import HealtBar from "./healt-bar";

class Header extends React.Component {
  render() {
    return (
      <div className="header no-select">
        <span style={{ color: "#fff", fontSize: "18px", fontWeight: "500" }}>
          Time: {this.props.estimatedTime}
        </span>
        <HealtBar heartCount={this.props.heartCount} />
      </div>
    );
  }
}

export default Header;