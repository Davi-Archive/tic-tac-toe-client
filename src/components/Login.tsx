import { useState } from "react";

interface formStateProp {
  userName: string;
  password: string;
}

const Login = () => {
  const [form, setForm] = useState<formStateProp>({
    userName: "",
    password: "",
  });
  const handleChange = (e: any) => {
    setForm(() => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(form);
    e.preventDefault();
  };

  return (
    <>
      <div className="Login">
        <label>Login</label>
        <form onSubmit={handleSubmit}>
          <input
            name="userName"
            placeholder="Username"
            onChange={handleChange}
            value={form.userName}
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
