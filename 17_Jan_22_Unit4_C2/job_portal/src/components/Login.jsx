import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Login.css"

export const Login = () => {
  const [form, setForm] = useState([]);
  const { handleToken } = useContext(AuthContext);
  const navigate = useNavigate();


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
          handleToken(res.token);
          navigate("/addjobs");
        } else {
          alert(res.error);
        }
      });
  };

  return (
    <div id="loginDiv">
        <h1 className="admin">Admin Login</h1>
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
