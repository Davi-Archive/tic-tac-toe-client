import { useState } from "react";
import { loginDataService } from "../services/dataService";
import Cookies from "universal-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Register from "./Register";

interface formStateProp {
  username: string;
  password: string;
}

const Login = ({ setIsAuth, children }: any) => {
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
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            type="text"
            placeholder="Enter username"
            onChange={handleChange}
            value={form.username}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Submit
        </Button>
        <Form.Group style={{margin: '20px'}}>{children}</Form.Group>
      </Form>
    </>
  );
};

export default Login;
