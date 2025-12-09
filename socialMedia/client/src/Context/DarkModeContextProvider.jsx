import { useEffect, useState } from "react";
import { DarkModeContext } from "./darkModeContext";


export const DarkModeContextProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);
// without JSON.parse() we would receive a string i.e 'false'
// JSON.parse("true")   // --> true  (boolean)
// JSON.parse("false")  // --> false (boolean)
// JSON.parse("123")    // --> 123   (number)

    const toggle = () => {
        setDarkMode(!darkMode);
    }
    useEffect(() => {
        localStorage.setItem("darkMode", darkMode)
    }, [darkMode]);

    return (
        <DarkModeContext.Provider value={{ darkMode, toggle }}>{children}</DarkModeContext.Provider>
    )
}