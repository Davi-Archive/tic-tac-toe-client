import React, { useState } from "react";
import { Board } from "./";
import { Window, MessageList, MessageInput } from "stream-chat-react";
import "./Chat.scss";

const Game = ({ channel, setChannel }: any) => {
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
      <Window>
        <MessageList
          closeReactionSelectorOnClick
          disableDateSeparator
          hideDeletedMessages
          messageActions={["react"]}
        />
        <MessageInput noFiles />
      </Window>
      <button
        onClick={async () => {
          await channel.stopWatching();
          setChannel(null);
        }}
      >
        Leave Game
      </button>
      {result.state === "won" && <h1>{result.winner} Won The Game</h1>}
      {result.state === "tie" && <h1>{result.winner} Game Tie</h1>}
    </div>
  );
};

export default Game;
