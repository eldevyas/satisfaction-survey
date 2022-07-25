import { createContext } from 'react';

const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
    authReady: false
});

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState;


    return (
        <AuthContext.Provider value="Ana zween 123">
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;