import { createContext, useContext, useState } from "react";
import api from "../api/axios.js";

//creates the context object that will hold auth across app
const AuthContext = createContext(null);

//authprovider wraps the app so any component can use auth
export const AuthProvider = ({ children }) => {
	//initialize user from localstorage, user stays logged in
	const [user, setUser] = useState(() => {
		const stored = localStorage.getItem("user");
		return stored ? JSON.parse(stored) : null;
	});

	//sends login credentials to backend, save token
	//and user to localstorage, update user state
	const login = async (email, password) => {
		const { data } = await api.post("/auth/login", { email, password });
		localStorage.setItem("token", data.token);
		localStorage.setItem("user", JSON.stringify(data.user));
		setUser(data.user);
	};

	//same as login but register endpoint instead
	const register = async (name, email, password) => {
		const { data } = await api.post("/auth/register", { name, email, password });
		localStorage.setItem("token", data.token);
		localStorage.setItem("user", JSON.stringify(data.user));
		setUser(data.user);
	};

	//clears the token and user from localstorage and 
	//set state to null to logout
	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setUser(null);
	};

	return (
		//makes all available to components that call useAuth
		<AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
			{children}
		</AuthContext.Provider>
	);
};

//hook that makes it easy to access auth context in components
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within AuthProvider");
	return context;
};
