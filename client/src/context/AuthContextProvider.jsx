
import { useState } from "react";

import axios from 'axios'
import { useEffect } from "react";
import { AuthContext } from "./authContext";


export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

    const login = async (inputs) => {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,
            inputs,
            { withCredentials: true }
        );
        setCurrentUser(res.data)
    };

    const logout = async () => {
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`,
            {},
            { withCredentials: true }
        );
        setCurrentUser(null);
    };

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser));
    },[currentUser]);

    return (
        <AuthContext.Provider value={{currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};