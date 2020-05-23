import React from "react";
import ScoreBar from "./score-bar";
import Header from "./header";
import { SCREEN, LEVEL, GAME } from "./constants";

import EggObject from "./objects/egg-obj";
import HeartObject from "./objects/heart-obj";
import DaggerObject from "./objects/dagger-obj";
import FreezeObject from "./objects/freeze-obj";
import ComboTenObject from "./objects/combo-ten-obj";
import ComboFiftyObject from "./objects/combo-fifty-obj";
import ComboHundredObject from "./objects/combo-hundred-obj";

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
      comboTenPosition: { x: 0, y: 0 },
      comboFiftyPosition: { x: 0, y: 0 },
      comboHundredPosition: { x: 0, y: 0 },
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
      comboTenBonusShow: false,
      comboTenBonusActive: false,
      comboFiftyBonusShow: false,
      comboFiftyBonusActive: false,
      comboHundredBonusShow: false,
      comboHundredBonusActive: false,
    };
  }

  componentDidMount() {
    this.gameArea.width = document.querySelector(".game-area").offsetWidth;
    this.gameArea.height = document.querySelector(".game-area").offsetHeight;
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
    this.setComboTenPositionAndTime();
    this.setComboFiftyPositionAndTime();
    this.setComboHundredPositionAndTime();
    this.gameTimer = setInterval(() => {
      this.setState((state, props) => ({
        estimatedTime: state.estimatedTime - 1,
      }));
      if (this.state.estimatedTime === 0) {
        clearInterval(this.gameTimer);
        this.saveScore();
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

  setHeartPositionAndTime() {
    let chanceTimes = this.getChances();
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
    let chanceTimes = this.getChances();
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
    let chanceTimes = this.getChances();
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

  setComboTenPositionAndTime() {
    let chanceTimes = this.getChances();
    let timeoutId = setInterval(() => {
      if (chanceTimes.includes(this.state.estimatedTime)) {
        this.setState({
          comboTenBonusShow: true,
          comboTenPosition: {
            x: this.getRandom(0, this.gameArea.width - 60),
            y: this.getRandom(60, this.gameArea.height - 60),
          },
        });
        let timeoutId2 = setTimeout(() => {
          this.setState({
            comboTenBonusShow: false,
          });
        }, GAME.BONUS_SHOW_TIME * 1000);
        this.timeouts.push(timeoutId2);
      }
    }, 1000);
    this.timeouts.push(timeoutId);
  }

  setComboFiftyPositionAndTime() {
    let chanceTimes = this.getChances();
    let timeoutId = setInterval(() => {
      if (chanceTimes.includes(this.state.estimatedTime)) {
        this.setState({
          comboFiftyBonusShow: true,
          comboFiftyPosition: {
            x: this.getRandom(0, this.gameArea.width - 60),
            y: this.getRandom(60, this.gameArea.height - 60),
          },
        });
        let timeoutId2 = setTimeout(() => {
          this.setState({
            comboFiftyBonusShow: false,
          });
        }, GAME.BONUS_SHOW_TIME * 1000);
        this.timeouts.push(timeoutId2);
      }
    }, 1000);
    this.timeouts.push(timeoutId);
  }

  setComboHundredPositionAndTime() {
    let chanceTimes = this.getChances();
    let timeoutId = setInterval(() => {
      if (chanceTimes.includes(this.state.estimatedTime)) {
        this.setState({
          comboHundredBonusShow: true,
          comboHundredPosition: {
            x: this.getRandom(0, this.gameArea.width - 60),
            y: this.getRandom(60, this.gameArea.height - 60),
          },
        });
        let timeoutId2 = setTimeout(() => {
          this.setState({
            comboHundredBonusShow: false,
          });
        }, GAME.BONUS_SHOW_TIME * 1000);
        this.timeouts.push(timeoutId2);
      }
    }, 1000);
    this.timeouts.push(timeoutId);
  }

  getChances() {
    let chanceTimes = [];
    if (this.props.level === LEVEL.EASY) {
      chanceTimes.push(this.getRandom(1, 30));
      chanceTimes.push(this.getRandom(30, 60));
    } else if (this.props.level === LEVEL.MEDIUM) {
      chanceTimes.push(this.getRandom(1, 10));
      chanceTimes.push(this.getRandom(10, 20));
      chanceTimes.push(this.getRandom(20, 30));
    }
    return chanceTimes;
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  click(e) {
    if (e.target.className.includes("egg")) {
      this.increaseClickScore();
    } else if (e.target.className.includes("heart")) {
      this.increaseHeart();
    } else if (e.target.className.includes("freeze")) {
      this.setState({ freezeBonusShow: false, freezeBonusActive: true });
    } else if (e.target.className.includes("comboTen")) {
      this.setState(() => ({
        comboTenBonusShow: false,
        comboTenBonusActive: true,
      }));
      let timeoutId = setTimeout(() => {
        this.setState(() => ({
          comboTenBonusShow: false,
          comboTenBonusActive: false,
        }));
      }, 7000);
      this.timeouts.push(timeoutId);
    } else if (e.target.className.includes("comboFifty")) {
      this.setState(() => ({
        comboFiftyBonusShow: false,
        comboFiftyBonusActive: true,
      }));
      let timeoutId = setTimeout(() => {
        this.setState(() => ({
          comboFiftyBonusShow: false,
          comboFiftyBonusActive: false,
        }));
      }, 5000);
      this.timeouts.push(timeoutId);
    } else if (e.target.className.includes("comboHundred")) {
      this.setState(() => ({
        comboHundredBonusShow: false,
        comboHundredBonusActive: true,
      }));
      let timeoutId = setTimeout(() => {
        this.setState(() => ({
          comboHundredBonusShow: false,
          comboHundredBonusActive: false,
        }));
      }, 2500);
      this.timeouts.push(timeoutId);
    } else if (e.target.className.includes("dagger")) {
      this.setState({ daggerBonusShow: false });
      this.decreaseClickScore(true);
      this.decreaseHeart(true);
    } else {
      this.decreaseClickScore(false);
      this.decreaseHeart(false);
    }
  }

  increaseClickScore() {
    let multiplication = 0;
    if (this.state.comboTenBonusActive) multiplication += 10;
    if (this.state.comboFiftyBonusActive) multiplication += 50;
    if (this.state.comboHundredBonusActive) multiplication += 100;
    if (multiplication === 0) multiplication = 1;

    this.setState((state, props) => ({
      clickScore: state.clickScore + GAME.SCORE_INCREASE * multiplication,
    }));
  }

  increaseHeart() {
    this.setState((state, props) => ({
      heartCount: GAME.HEART,
      heartBonusShow: false,
    }));
  }

  decreaseClickScore(isDagger) {
    let decreaseLimit = isDagger
      ? GAME.DAGGER_SCORE_DECREASE
      : GAME.SCORE_DECREASE;

    if (this.state.clickScore > decreaseLimit) {
      this.setState((state, props) => ({
        clickScore: state.clickScore - decreaseLimit,
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
      this.saveScore();
      this.props.setScore(this.state.clickScore);
      this.props.setScreen(SCREEN.GAME_OVER);
    }
  }

  saveScore() {
    let history = { highScore: 0, scores: [], username: this.props.username };
    let _historyStr = localStorage.getItem(GAME.LOCAL_DATA);
    if (_historyStr === null) {
      history.highScore = this.state.clickScore;
      history.scores.push(this.state.clickScore);
      localStorage.setItem(GAME.LOCAL_DATA, JSON.stringify(history));
    } else {
      let _history = JSON.parse(_historyStr);
      if (_history.highScore < this.state.clickScore)
        history.highScore = this.state.clickScore;
      else history.highScore = _history.highScore;

      if (_history.scores.length < 10) {
        history.scores = history.scores.concat(_history.scores);
        history.scores.push(this.state.clickScore);
      } else {
        history.scores = history.scores.concat(_history.scores);
        history.scores.push(this.state.clickScore);
        history.scores.shift();
      }
      localStorage.setItem(GAME.LOCAL_DATA, JSON.stringify(history));
    }
  }

  render() {
    return (
      <div className="game-board">
        <Header
          estimatedTime={this.state.estimatedTime}
          heartCount={this.state.heartCount}
        />

        <div className="game-area no-select" onClick={(e) => this.click(e)}>
          <EggObject position={this.state.eggPosition} />
          {this.state.heartBonusShow && (
            <HeartObject position={this.state.heartPosition} />
          )}
          {this.state.daggerBonusShow && (
            <DaggerObject position={this.state.daggerPosition} />
          )}
          {this.state.freezeBonusShow && (
            <FreezeObject position={this.state.freezePosition} />
          )}
          {this.state.comboTenBonusShow && (
            <ComboTenObject position={this.state.comboTenPosition} />
          )}
          {this.state.comboFiftyBonusShow && (
            <ComboFiftyObject position={this.state.comboFiftyPosition} />
          )}
          {this.state.comboHundredBonusShow && (
            <ComboHundredObject position={this.state.comboHundredPosition} />
          )}
        </div>

        <ScoreBar
          score={this.state.clickScore}
          comboTenBonusActive={this.state.comboTenBonusActive}
          comboFiftyBonusActive={this.state.comboFiftyBonusActive}
          comboHundredBonusActive={this.state.comboHundredBonusActive}
        />
      </div>
    );
  }
}

export default Game;
