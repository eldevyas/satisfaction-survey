import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { pushInfo , pushSuccess, pushFailure, pushWarning } from './../services/alert';
import axios from 'axios';


function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {}
});

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const Router = useRouter();

    useEffect(() => {
        // Check if the current token is valid and the user is logged in
        if (localStorage.getItem('token')) {
            // Decode the token
            const token = localStorage.getItem('token');
            const decoded = parseJwt(token);

            // Check if the token is expired
            if (decoded.exp < Date.now()) {
                setUser(decoded.userData);
                pushSuccess(`Vous êtes connecté en tant que ${decoded.userData.full_name} .`);
            } else {
                setUser(null);
                pushWarning('Votre session est expirée, veuillez vous reconnecter.');
            }
        } else {
            setUser(null);
            pushFailure('Vous n\'êtes pas connecté.');
        }
    }, []);

    const login = async (credentials) => {
        const SERVER_URL = "http://192.168.11.104/SatisfactionSurvey/server/public/";
        // const SERVER_URL = "http://trycod.ntic";

        
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
            console.log(response);
            if (response.data) {
                if (response.data.status === "success") {
                    localStorage.setItem('token', response.data.jwt);
                    pushSuccess(`Vous êtes connecté en tant que ${response.data.user.full_name} .`);
                    Router.push('/admin')
                    setUser(response.data.user);
                } else if(response.data.status === "error") {
                    pushFailure(response.data.message);
                    setUser(null);
                } else {
                    pushFailure("Une erreur est survenue.");
                    setUser(null);
                }
            } else {
                pushFailure("Une erreur est survenue.");
                setUser(null);
            }
        })
        .catch((error) => { 
            console.log(error);
            pushFailure(error.message);
        })
    }

    const logout = () => {
        pushInfo("Vous venez de vous déconnecter.");
        localStorage.removeItem('token');
        setUser(null);
        Router.push('/admin/login');
    }


    const isLoggedIn = () => {
        return localStorage.getItem('token') !== null;
    }

    const Context = {
        user: user,
        login: login,
        logout: logout,
        isLoggedIn: isLoggedIn
    }

    return (
        <AuthContext.Provider value={Context}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;