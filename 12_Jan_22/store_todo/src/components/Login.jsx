import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Login.css"

export const Login = () => {
  const [form, setForm] = useState([]);
  const { handleToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    userToken();
  }, []);

  const userToken = () => {
    let user_token = JSON.parse(localStorage.getItem("user_token"));
    if (user_token) {
      handleToken(user_token.token);
      navigate("/todo");
      console.log("User:", user_token);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const login = () => {
    fetch("https://reqres.in/api/login", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "content-type": "application/json" },
    })
      .then((d) => d.json())
      .then((res) => {
        console.log(res);
        if (res.token) {
          if (localStorage.getItem("user_token") === null) {
            localStorage.setItem("user_token", JSON.stringify(res));
          } else {
            localStorage.setItem("user_token", JSON.stringify(res));
          }
          navigate("/todo");
        } else {
          alert(res.error);
        }
      });
  };

  return (
    <div id="loginDiv">
      <input
        type="text"
        onChange={handleChange}
        name="email"
        placeholder="Email"
      />
      <input
        type="text"
        onChange={handleChange}
        name="password"
        placeholder="Password"
      />
      <button id="loginBtn" onClick={login}>Log In</button>
    </div>
  );
};
