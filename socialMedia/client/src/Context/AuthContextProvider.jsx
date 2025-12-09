import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";


export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
// without JSON.parse() we would receive a string i.e 'false'
// JSON.parse("true")   // --> true  (boolean)
// JSON.parse("false")  // --> false (boolean)
// JSON.parse("123")    // --> 123   (number)

    const login = () => {
        setCurrentUser({
            id: 1,
            name: "Maruf Ibrahim",
            profilePic: "https://cdn.pixabay.com/photo/2024/02/24/22/37/ai-generated-8594846_1280.png"
        })
    }
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login  }}>{children}</AuthContext.Provider>
    )
}