import React from "react";
import HealtBar from "./healt-bar";
import ScoreBar from "./score-bar";
import { SCREEN, LEVEL, GAME } from "./constants";

import egg from "./../assets/egg.svg";
import dagger from "./../assets/dagger.svg";
import heart from "./../assets/heart.svg";
import freeze from "./../assets/freeze.svg";
import increaseSound from './../assets/increase.mp3';
import decreaseSound from './../assets/decrease.mp3';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.timeouts = [];
    this.gameArea = { width: 0, height: 0 };

    this.state = {
      eggPosition: { x: 0, y: 0 },
      freezePosition: { x: 0, y: 0 },
      daggerPosition: { x: 0, y: 0 },
      heartPosition: { x: 0, y: 0 },
      estimatedTime:
        this.props.level === LEVEL.EASY
          ? GAME.EASY_DURATION
          : GAME.MEDIUM_DURATION,
      heartCount: 10,
      clickScore: 0,
      heartBonusShow: false,
      daggerBonusShow: false,
      freezeBonusShow: false,
      freezeBonusActive: false,
    };
  }

  componentDidMount() {
    this.gameArea.width = document.querySelector(".gameArea").offsetWidth;
    this.gameArea.height = document.querySelector(".gameArea").offsetHeight;
    this.startGame();
  }

  componentWillUnmount() {
    clearInterval(this.gameTimer);
    for (const iterator of this.timeouts) {
      clearTimeout(iterator);
    }
  }

  startGame() {
    // set x-y position center
    this.setState({
      eggPosition: {
        x: this.gameArea.width / 2 - 30,
        y: this.gameArea.height / 2 - 30,
      },
    });
    // set x-y position random
    this.eggPositionChanger();
    this.setHeartPositionAndTime();
    this.setFreezePositionAndTime();
    this.setDaggerPositionAndTime();
    this.gameTimer = setInterval(() => {
      this.setState((state, props) => ({
        estimatedTime: state.estimatedTime - 1
      }));
      if (this.state.estimatedTime === 0) {
        clearInterval(this.gameTimer);
        this.props.setScore(this.state.clickScore);
        this.props.setScreen(SCREEN.GAME_OVER);
      }
    }, 1000);
  }

  eggPositionChanger() {
    //generated random egg show time
    let randomTime = this.getRandom(2, 6);
    let timeoutId = setTimeout(() => {
      if (this.state.estimatedTime > 0) {
        //check if existing freezebonus
        if (this.state.freezeBonusActive) {
          this.setState({ freezeBonusActive: false });
          let timeoutId2 = setTimeout(() => {
            //generated random egg positions
            this.setState({
              eggPosition: {
                x: this.getRandom(0, this.gameArea.width - 60),
                y: this.getRandom(60, this.gameArea.height - 60),
              },
            });
            //trigger next loop
            this.eggPositionChanger();
          }, GAME.FREEZE_TIME * 1000);
          this.timeouts.push(timeoutId2);
        } else {
          //generated random egg positions
          this.setState({
            eggPosition: {
              x: this.getRandom(0, this.gameArea.width - 60),
              y: this.getRandom(60, this.gameArea.height - 60),
            },
          });
          //trigger next loop
          this.eggPositionChanger();
        }
      }
    }, randomTime * 1000);
    this.timeouts.push(timeoutId);
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  setHeartPositionAndTime() {
    let chanceTimes = [];
    if (this.props.level === LEVEL.EASY) {
      chanceTimes.push(this.getRandom(1, 30));
      chanceTimes.push(this.getRandom(30, 60));
    } else if (this.props.level === LEVEL.MEDIUM) {
      chanceTimes.push(this.getRandom(1, 10));
      chanceTimes.push(this.getRandom(10, 20));
      chanceTimes.push(this.getRandom(20, 30));
    }

    let timeoutId = setInterval(() => {
      if (chanceTimes.includes(this.state.estimatedTime)) {
        this.setState({
          heartBonusShow: true,
          heartPosition: {
            x: this.getRandom(0, this.gameArea.width - 60),
            y: this.getRandom(60, this.gameArea.height - 60),
          },
        });
        let timeoutId2 = setTimeout(() => {
          this.setState({
            heartBonusShow: false,
          });
        }, GAME.BONUS_SHOW_TIME * 1000);
        this.timeouts.push(timeoutId2);
      }
    }, 1000);
    this.timeouts.push(timeoutId);
  }

  setFreezePositionAndTime() {
    let chanceTimes = [];
    if (this.props.level === LEVEL.EASY) {
      chanceTimes.push(this.getRandom(1, 30));
      chanceTimes.push(this.getRandom(30, 60));
    } else if (this.props.level === LEVEL.MEDIUM) {
      chanceTimes.push(this.getRandom(1, 10));
      chanceTimes.push(this.getRandom(10, 20));
      chanceTimes.push(this.getRandom(20, 30));
    }

    let timeoutId = setInterval(() => {
      if (chanceTimes.includes(this.state.estimatedTime)) {
        this.setState({
          freezeBonusShow: true,
          freezePosition: {
            x: this.getRandom(0, this.gameArea.width - 60),
            y: this.getRandom(60, this.gameArea.height - 60),
          },
        });
        let timeoutId2 = setTimeout(() => {
          this.setState({
            freezeBonusShow: false,
          });
        }, GAME.BONUS_SHOW_TIME * 1000);
        this.timeouts.push(timeoutId2);
      }
    }, 1000);
    this.timeouts.push(timeoutId);
  }

  setDaggerPositionAndTime() {
    let chanceTimes = [];
    if (this.props.level === LEVEL.EASY) {
      chanceTimes.push(this.getRandom(1, 30));
      chanceTimes.push(this.getRandom(30, 60));
    } else if (this.props.level === LEVEL.MEDIUM) {
      chanceTimes.push(this.getRandom(1, 10));
      chanceTimes.push(this.getRandom(10, 20));
      chanceTimes.push(this.getRandom(20, 30));
    }

    let timeoutId = setInterval(() => {
      if (chanceTimes.includes(this.state.estimatedTime)) {
        this.setState({
          daggerBonusShow: true,
          daggerPosition: {
            x: this.getRandom(0, this.gameArea.width - 60),
            y: this.getRandom(60, this.gameArea.height - 60),
          },
        });
        let timeoutId2 = setTimeout(() => {
          this.setState({
            daggerBonusShow: false,
          });
        }, GAME.BONUS_SHOW_TIME * 1000);
        this.timeouts.push(timeoutId2);
      }
    }, 1000);
    this.timeouts.push(timeoutId);
  }

  click(e) { 
    if (e.target.className === "egg") {
      new Audio(increaseSound).play();
      this.increaseClickScore();
    } else if (e.target.className === "heart") {
      new Audio(increaseSound).play();
      this.increaseHeart();
    } else if (e.target.className === "freeze") {
      new Audio(increaseSound).play();
      this.setState({ freezeBonusShow: false, freezeBonusActive: true });
    } else if (e.target.className === "dagger") {
      new Audio(decreaseSound).play();
      this.setState({ daggerBonusShow: false });
      this.decreaseClickScore(true);
      this.decreaseHeart(true);
    } else {
      new Audio(decreaseSound).play();
      this.decreaseClickScore(false);
      this.decreaseHeart(false);
    }
  }

  increaseClickScore() {
    this.setState((state, props) => ({
      clickScore: state.clickScore + GAME.SCORE_INCREASE
    }));
  }

  increaseHeart() {
    this.setState((state, props) => ({
      counter: state.heartCount + GAME.HEART,
      heartBonusShow: false,
    }));
  }

  decreaseClickScore(isDagger) {
    let decreaseLimit = isDagger
      ? GAME.DAGGER_SCORE_DECREASE
      : GAME.SCORE_DECREASE;

    if (this.state.clickScore > decreaseLimit) {
      this.setState((state, props) => ({
        clickScore: state.clickScore - decreaseLimit
      }));
    } else {
      this.setState({ clickScore: 0 });
    }
  }

  decreaseHeart(isDagger) {
    let heartLimit = isDagger
      ? GAME.DAGGER_HEART_DECREASE
      : GAME.HEART_DECREASE;

    if (this.state.heartCount > heartLimit) {
      this.setState((state, props) => ({
        heartCount: state.heartCount - heartLimit,
      }));
    } else {
      this.props.setScore(this.state.clickScore);
      this.props.setScreen(SCREEN.GAME_OVER);
    }
  }

  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            flexGrow: 0,
          }}
        >
          <span style={{ color: "#fff", fontSize: "18px", fontWeight: "500" }}>
            Time: {this.state.estimatedTime}
          </span>
          <HealtBar heartCount={this.state.heartCount} />
        </div>

        <div
          className="gameArea"
          onClick={(e) => this.click(e)}
          style={{ background: "#f1ebbb", flexGrow: 1 }}
        >
          <img
            alt=""
            className="egg"
            src={egg}
            width={GAME.OBJECT_SIZE}
            style={{
              position: "absolute",
              left: this.state.eggPosition.x,
              top: this.state.eggPosition.y,
            }}
          />

          {this.state.heartBonusShow ? (
            <img
              alt=""
              className="heart"
              style={{
                position: "absolute",
                left: this.state.heartPosition.x,
                top: this.state.heartPosition.y,
              }}
              src={heart}
              width={GAME.OBJECT_SIZE}
            />
          ) : (
            ""
          )}

          {this.state.daggerBonusShow ? (
            <img
              alt=""
              className="dagger"
              style={{
                position: "absolute",
                left: this.state.daggerPosition.x,
                top: this.state.daggerPosition.y,
              }}
              src={dagger}
              width={GAME.OBJECT_SIZE}
            />
          ) : (
            ""
          )}

          {this.state.freezeBonusShow ? (
            <img
              alt=""
              className="freeze"
              style={{
                position: "absolute",
                left: this.state.freezePosition.x,
                top: this.state.freezePosition.y,
              }}
              src={freeze}
              width={GAME.OBJECT_SIZE}
            />
          ) : (
            ""
          )}
        </div>

        <ScoreBar score={this.state.clickScore} />
      </div>
    );
  }
}

export default Game;
