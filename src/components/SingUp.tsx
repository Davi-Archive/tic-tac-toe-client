import { useState } from "react";
import { signUpDataService } from "../services/dataService";
import Cookies from "universal-cookie";
import { Button, Col, Form, Row } from "react-bootstrap";

interface formStateProp {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

const SingUp = ({ setIsAuth, children }: any) => {
  const [form, setForm] = useState<formStateProp>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const handleChange = (e: any) => {
    setForm(() => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    signUpDataService(form).then((data) => {
      setIsAuth(true);
      console.log(data);
    });
    e.preventDefault();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              value={form.firstName}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              value={form.lastName}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={form.username}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
            type="password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Form.Group style={{ margin: "15px" }}>{children}</Form.Group>
      </Form>
    </>
  );
};

export default SingUp;
