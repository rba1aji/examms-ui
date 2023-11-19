import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [menuLoginType, setMenuLoginType] = useState();
    const [user, setUser] = useState();
    const [userRole, setUserRole] = useState(Cookies.get('userRole'));
    const [authtoken, setAuthtoken] = useState(Cookies.get('authtoken'));


    return (
        <AppContext.Provider
            value={{
                menuLoginType, setMenuLoginType,
                user, setUser,
                userRole, setUserRole,
                authtoken, setAuthtoken
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
