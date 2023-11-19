import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { GET_ALL_DEPARTMENT } from "./ApiEndPoints";
import Cookies from "js-cookie";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [menuLoginType, setMenuLoginType] = useState();
    const [user, setUser] = useState();
    const [userRole, setUserRole] = useState(
        // window.sessionStorage.getItem('userRole')
    );


    return (
        <AppContext.Provider
            value={{
                menuLoginType, setMenuLoginType,
                user, setUser,
                userRole, setUserRole,
                // token, setToken
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;

export const AppState = () => {
    return useContext(AppContext);
}
