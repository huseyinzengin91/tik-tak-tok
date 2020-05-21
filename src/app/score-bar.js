import React from "react";

class ScoreBar extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 0,
          padding: "5px 0px",
          fontSize: "24px",
          color: "#fff",
          fontWeight: "700",
        }}
      >
        {this.props.score}
      </div>
    );
  }
}

export default ScoreBar;
