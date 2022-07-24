import axios from "axios";
const SERVER_URL = "http://trycod.ntic";
import { pushSuccess, pushFailure, pushWarning } from "./alert";

const login = async (credentials) => {
    const LOGIN_ENDPOINT = `${SERVER_URL}/users/signin`;
    console.log(LOGIN_ENDPOINT);

    let data = JSON.stringify({
        password: credentials.password,
        username: credentials.email
    })

    axios.post(LOGIN_ENDPOINT, data, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then((response) => { 
        console.log(response.data);
        if (response.data) {
            pushSuccess("Vous êtes connecté.");
        } else {
            pushFailure("Votre nom d'utilisateur ou votre mot de passe est incorrect.");
        }
    })
    .catch((error) => { console.log(error) })
};

export { login };