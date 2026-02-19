import { useState, useEffect, createContext, useContext } from "react";

import api from "../utils/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const res = await api.get("/api/me", { withCredentials: true });
                setUser(res.data);
            } catch (err) {
                setUser(null);
            }
        };

        fetchMe();
    },[]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);