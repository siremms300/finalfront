
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const userContext = React.createContext();

const UserContext = ({ children }) => {
    const [userLoading, setUserLoading] = useState(true);
    const [userError, setUserError] = useState({ status: false, message: "" });
    const [user, setUser] = useState(null);

    const handleFetchMe = async () => {
        setUserLoading(true);
        try {
            const response = await axios.get(

                `${import.meta.env.VITE_API_BASE_URL}/auth/me`,

                { withCredentials: true }
            );
            setUserError({ status: false, message: "" });
            setUser(response?.data?.result);
        } catch (error) {
            setUserError({ status: true, message: error?.message });
            setUser(null);
        }
        setUserLoading(false);
    };

    const logout = async () => {
        try {
            await axios.post(

                `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
                {},
                { withCredentials: true }
            );
            setUser(null); // Clear user state on logout
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    
    useEffect(() => {
        handleFetchMe();
    }, []);

    const passing = { userLoading, userError, user, handleFetchMe, logout };
    return (
        <userContext.Provider value={passing}>{children}</userContext.Provider>
    );
};

const useUserContext = () => useContext(userContext);

export { useUserContext, UserContext };






