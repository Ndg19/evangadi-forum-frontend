import { createContext, useState, useEffect } from "react";
import api, { setAuthToken } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);

  // Attach token to API instance whenever it changes
  useEffect(() => {
    setAuthToken(token || null);
  }, [token]);

  // Check user on app start
  useEffect(() => {
    const checkUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get("/user/checkUser");
        // backend returns { user: { user_id, username, email } }
        const payload = res.data?.user || res.data || {};
        const username =
          payload.username || payload.user_name || payload.name || "";
        const userid = payload.user_id || payload.id || payload.userid || "";
        setUser({ username, userid });
      } catch (err) {
        console.error("User check failed:", err);
        logout();
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, [token]);

  const login = (token, username, userid) => {
    setToken(token);
    localStorage.setItem("token", token);
    setUser({ username, userid });
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
