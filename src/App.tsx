import "./App.scss";
import { SingUp, Login } from "./components";
import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const App = () => {
  const token = cookies.get("token");
  const client = StreamChat.getInstance(import.meta.env.VITE_API_KEY);
  if (token) {
    client.connectUser();
  }

  return (
    <div className="App">
      <h1>React type</h1>
      <SingUp />
      <Login />
    </div>
  );
};

export default App;
