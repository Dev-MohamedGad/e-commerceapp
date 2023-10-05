import { createContext, useState } from "react";





export let UserToken = createContext(null)

export function UserTokenProvider({ children }) {
    let [isLogin, setIsLogin] = useState(null)
    let [idowner, setidowner] = useState(null);

    return <UserToken.Provider value={{ isLogin, setIsLogin ,idowner, setidowner }}>
        {children}
    </UserToken.Provider>
}