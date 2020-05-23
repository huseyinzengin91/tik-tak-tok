import React, { useState } from "react";
import "./App.css";
import { SCREEN, LEVEL } from "./app/constants";
import Lobby from "./app/lobby";
import Level from "./app/level";
import Game from "./app/game";
import GameOver from "./app/game-over";
import Scores from "./app/scores";

function App() {
  const [screen, setScreen] = useState(SCREEN.LOBBY);
  const [username, setUsername] = useState("");
  const [level, setLevel] = useState(LEVEL.EASY);
  const [score, setScore] = useState(0);

  return (
    <div className="App" onDoubleClick={(e) => e.preventDefault()}>
      {screen === SCREEN.LOBBY ? (
        <Lobby
          username={username}
          setUsername={setUsername}
          setScreen={setScreen}
        />
      ) : screen === SCREEN.LEVEL ? (
        <Level level={level} setLevel={setLevel} setScreen={setScreen} />
      ) : screen === SCREEN.GAME_BOARD ? (
        <Game
          username={username}
          level={level}
          setScore={setScore}
          setScreen={setScreen}
        />
      ) : screen === SCREEN.SCORES ? (
        <Scores setScreen={setScreen} />
      ) : (
        <GameOver score={score} username={username} setScreen={setScreen} />
      )}
    </div>
  );
}

export default App;
