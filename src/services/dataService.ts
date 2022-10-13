import axios from 'axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const URL = import.meta.env.VITE_URL;

interface signUpProp {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
}

const signUpDataService = async ({ firstName, lastName, userName, password }: signUpProp) => {
    const res = await axios.post(`${URL}/user/signup`, {
        firstName,
        lastName,
        userName,
        password
    })

    const { token, userId, hashedPassword } = await res.data

    cookies.set("token", token);
    cookies.set("userId", userId);
    cookies.set("username", userName);
    cookies.set("firstName", firstName);
    cookies.set("lastName", lastName);
    cookies.set("hashedPassword", hashedPassword);

    return res
}

export { signUpDataService }