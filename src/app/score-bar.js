import React from "react";

class ScoreBar extends React.Component {
  render() {
    return <div className="score-bar no-select">
      <span>{this.props.score}</span>
      <div>
        {this.props.comboTenBonusActive && (<span>x10</span>)}
        {this.props.comboFiftyBonusActive && (<span>x50</span>)}
        {this.props.comboHundredBonusActive && (<span>x100</span>)}
      </div>
      </div>;
  }
}

export default ScoreBar;