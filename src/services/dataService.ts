import axios from 'axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const URL = import.meta.env.VITE_URL;

interface signUpProp {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}

const signUpDataService = async ({ firstName, lastName, username, password }: signUpProp) => {
    const res = await axios.post(`${URL}/user/signup`, {
        firstName,
        lastName,
        username,
        password
    })
    const { token, userId, hashedPassword } = await res.data
    cookies.set("token", token);
    cookies.set("userId", userId);
    cookies.set("username", username);
    cookies.set("firstName", firstName);
    cookies.set("lastName", lastName);
    cookies.set("hashedPassword", hashedPassword);

    return res.data
}



interface loginProp {
    username: string;
    password: string;
}


const loginDataService = async ({ username, password }: loginProp) => {
    const res = await axios.post(`${URL}/user/login`, {
        username,
        password
    })
    return res
}

export { signUpDataService, loginDataService }