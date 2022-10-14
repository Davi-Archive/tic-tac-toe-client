import Cookies from "universal-cookie";
import { SingUp, Login, Game, JoinGame, Register } from "./components";
import { StreamChat } from "stream-chat";
import { useState } from "react";
import { Chat } from "stream-chat-react";
import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

const cookies = new Cookies();

const App = () => {
  const token = cookies.get("token");
  const [gotUser, setGotUser] = useState<boolean>(true);
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
            <JoinGame>
              <Button variant="danger" onClick={logOut}>
                Log Out
              </Button>
            </JoinGame>
          </Chat>
        </>
      )}
      {!isAuth && (
        <>
          {!gotUser && (
            <SingUp setIsAuth={setIsAuth}>
              <Register gotUser={gotUser} setGotUser={setGotUser} />
            </SingUp>
          )}
          {gotUser && (
            <Login setIsAuth={setIsAuth}>
              <Register gotUser={gotUser} setGotUser={setGotUser} />
            </Login>
          )}
        </>
      )}
    </div>
  );
};

export default App;
