import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState("Log In");
  const [token, setToken] = useState("");

  const handleLogin = (text) => {
    fetch("https://reqres.in/api/login", {
      method: "POST",
      body: JSON.stringify(text),
      headers: { "content-type": "application/json" },
    })
      .then((d) => 
        d.json()
      )
      .then((res) => {
        setToken(res.token);
      })
      setIsAuth("Log Out");
  };

  return (
    <AuthContext.Provider value={{ token,setIsAuth, isAuth, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
