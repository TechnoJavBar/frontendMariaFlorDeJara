import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Al cargar la app, revisamos si hay rastro en el localStorage
        const auth = localStorage.getItem("isLoggedIn") === "true";
        const savedUser = localStorage.getItem("userName");
        const savedRole = localStorage.getItem("userRole");
        const savedEmail = localStorage.getItem("userEmail");


        if (auth && savedUser && savedRole) {
            setIsAuthenticated(true);
            setUser({ nombre: savedUser, role: savedRole, email: savedEmail});
        }
        setLoading(false);
    }, []);

    const loginSync = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", userData.nombre);
        localStorage.setItem("userRole", userData.role);
        localStorage.setItem("userEmail", userData.email);
    };

    const logoutSync = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userName");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userEmail");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loginSync, logoutSync, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};