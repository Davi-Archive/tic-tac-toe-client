import { useState } from "react";
import { loginDataService } from "../services/dataService";
import Cookies from "universal-cookie";

interface formStateProp {
  username: string;
  password: string;
}

const Login = ({setIsAuth}: any) => {
  const cookies = new Cookies();
  const [form, setForm] = useState<formStateProp>({
    username: "",
    password: "",
  });
  const handleChange = (e: any) => {
    setForm(() => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginDataService(form).then((res) => {
      const { firstName, lastName, username, token, userId } = res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      console.log(res.data);
      setIsAuth(true);
    });
  };

  return (
    <>
      <div className="Login">
        <label>Login</label>
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={form.username}
          />
          <input
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
            type="password"
          />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
