import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SERVER_URL = "http://trycod.ntic";
import { pushSuccess, pushFailure, pushWarning } from "./alert";
import { useRouter } from 'next/router';

async function login(credentials){
    const LOGIN_ENDPOINT = `${SERVER_URL}/signin`;
    

    let data = JSON.stringify({
        password: credentials.password,
        username: credentials.email
    })

    return axios.post(LOGIN_ENDPOINT, data, {
        headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then((response) => { 
        if (response.data) {
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                pushSuccess("Vous êtes connecté.");
            } else {
                pushFailure("Votre nom d'utilisateur ou votre mot de passe est incorrect.");
            }
        } else {
            pushFailure("Votre nom d'utilisateur ou votre mot de passe est incorrect.");
            return false;
        }
    })
    .catch((error) => { 
        console.log(error);
        pushFailure(error.message);
        return false;
     })
};


const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
}

export { login };