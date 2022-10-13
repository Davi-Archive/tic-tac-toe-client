import { useState } from "react";

const JoinGame = () => {
  const [rival, setRival] = useState<string>("");
  return (
    <section className="joinGame">
      <h4>JoinGame</h4>
      <input
        placeholder="Username of Rival"
        value={rival}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setRival(e.target.value)
        }
      />
    </section>
  );
};

export default JoinGame;
