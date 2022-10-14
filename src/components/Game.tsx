import React, { useState } from "react";
import { Board } from "./";

const Game = ({ channel }: any) => {
  const [result, setResult] = useState({ winner: "", state: "none" });
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  channel.on("user.watching.start", (event: any) => {
    setPlayersJoined(event.watcher_count === 2);
  });
  if (!playersJoined) {
    return <section>Waiting for other player to join</section>;
  }
  return (
    <div className="gameContainer">
      <Board result={result} setResult={setResult} />
      {/* CHAT */}
      {/* LEAVE GAME BUTTON */}
    </div>
  );
};

export default Game;
