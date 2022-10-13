import Cookies from "universal-cookie";
import { SingUp, Login, Game, JoinGame } from "./components";
import { StreamChat } from "stream-chat";
import { useState } from "react";
import { Chat } from "stream-chat-react";

import "./App.scss";

const cookies = new Cookies();

const App = () => {
  const token = cookies.get("token");
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const client = StreamChat.getInstance(import.meta.env.VITE_API_KEY);
  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          userName: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
        console.log(user);
      });
  }

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };
  return (
    <div className="App">
      {isAuth && (
        <>
          <Chat client={client}>
            <JoinGame />
            <button onClick={logOut}>Log Out</button>
          </Chat>
        </>
      )}
      {!isAuth && (
        <>
          <SingUp setIsAuth={setIsAuth} />
          <Login setIsAuth={setIsAuth} />
        </>
      )}
    </div>
  );
};

export default App;
