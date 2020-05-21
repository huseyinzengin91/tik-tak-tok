import React, { useState } from "react";
import "./App.css";
import { SCREEN, LEVEL } from "./app/constants";
import Lobby from "./app/lobby";
import Level from "./app/level";
import Game from "./app/game";
import GameOver from "./app/game-over";

function App() {
  const [screen, setScreen] = useState(SCREEN.LOBBY);
  const [username, setUsername] = useState("");
  const [level, setLevel] = useState(LEVEL.MEDIUM);
  const [score, setScore] = useState(0);

  return (
    <div className="App">
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
      ) : (
        <GameOver score={score} username={username} setScreen={setScreen}/>
      )}
    </div>
  );
}

export default App;
