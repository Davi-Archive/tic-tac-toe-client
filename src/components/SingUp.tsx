import { useState } from "react";
import { signUpDataService } from "../services/dataService";
import Cookies from "universal-cookie";

interface formStateProp {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}



const SingUp = ({setIsAuth}:any) => {
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
          <button type="submit">Signup</button>
        </form>
      </div>
    </>
  );
};

export default SingUp;
