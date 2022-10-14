import { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import { Game } from "./";
import { CustomInput } from "./";

const JoinGame = () => {
  const [rival, setRival] = useState<string>("");
  const [channel, setChannel] = useState<any>(null);
  const { client } = useChatContext();
  const createChannel = async () => {
    const response = await client.queryUsers({ username: { $eq: rival } });
    if (response.users.length === 0) {
      return alert("user not found");
    }

    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });

    await newChannel.watch();
    setChannel(newChannel);
  };
  return (
    <>
      {channel ? (
        <Channel channel={channel} Input={CustomInput}>
          <Game channel={channel} setChannel={setChannel} />
        </Channel>
      ) : (
        <section className="joinGame">
          <h4>Create Game</h4>
          <input
            placeholder="Username of Rival"
            value={rival}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRival(e.target.value)
            }
          />
          <button onClick={createChannel}> Join/Start Game</button>
        </section>
      )}
    </>
  );
};

export default JoinGame;
