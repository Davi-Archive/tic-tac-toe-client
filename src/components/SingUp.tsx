import { useState } from "react";
import { signUpDataService } from "../services/dataService";
import Cookies from "universal-cookie";

interface formStateProp {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
}

const SingUp = () => {
  const cookies = new Cookies();
  const [form, setForm] = useState<formStateProp>({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
  });
  const handleChange = (e: any) => {
    setForm(() => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    signUpDataService(form).then((data) => console.log(data));
    e.preventDefault();
  };

  return (
    <>
      <div className="singUp">
        <label>SingUp</label>
        <form onSubmit={handleSubmit}>
          <input
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            value={form.firstName}
          />
          <input
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            value={form.lastName}
          />
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
          <button type="submit">Signup</button>
        </form>
      </div>
    </>
  );
};

export default SingUp;
