import { useEffect, useState } from "react";
import { Square, winningPatterns } from "./";
import { useChannelStateContext, useChatContext } from "stream-chat-react";

const Board = ({ result, setResult }: any) => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [turn, setTurn] = useState("X");
  const [player, setPlayer] = useState("X");

  const { channel } = useChannelStateContext();
  const { client } = useChatContext();

  useEffect(() => {
    checkIfTie();
    checkWin();
  }, [board]);

  const chooseSquare = async (square: any) => {
    if (turn === player && board[square] === "") {
      setTurn(player === "X" ? "O" : "X");
      await channel.sendEvent({
        type: "game-move",
        data: { square, player },
      });
      setBoard(
        board.map((val, idx) => {
          if (idx === square && val === "") {
            return player;
          }
          return val;
        })
      );
    }
  };

  channel.on((event: any) => {
    if (event.type === "game-move" && event.user.id !== client.userID) {
      const currentPlayer = event.data.player === "X" ? "O" : "X";
      setPlayer(currentPlayer);
      setTurn(currentPlayer);
      setBoard(
        board.map((val, idx) => {
          if (idx === event.data.square && val === "") {
            return event.data.player;
          }
          return val;
        })
      );
    }
  });

  const checkWin = () => {
    winningPatterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer == "") return;
      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (board[idx] != firstPlayer) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        setResult({ winner: board[currPattern[0]], state: "won" });
      }
    });
  };

  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square == "") filled = false;
    });
    if (filled) {
      setResult({ winner: "none", state: "tie" });
    }
  };

  return (
    <section className="board">
      <div className="row">
        <Square chooseSquare={() => chooseSquare(0)} val={board[0]} />
        <Square chooseSquare={() => chooseSquare(1)} val={board[1]} />
        <Square chooseSquare={() => chooseSquare(2)} val={board[2]} />
      </div>
      <div className="row">
        <Square chooseSquare={() => chooseSquare(3)} val={board[3]} />
        <Square chooseSquare={() => chooseSquare(4)} val={board[4]} />
        <Square chooseSquare={() => chooseSquare(5)} val={board[5]} />
      </div>
      <div className="row">
        <Square chooseSquare={() => chooseSquare(6)} val={board[6]} />
        <Square chooseSquare={() => chooseSquare(7)} val={board[7]} />
        <Square chooseSquare={() => chooseSquare(8)} val={board[8]} />
      </div>
    </section>
  );
};

export default Board;
