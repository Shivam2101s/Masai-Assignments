import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const { handleToken } = useContext(AuthContext);

let token = JSON.parse(localStorage.getItem("user_token"));



  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user_token");
    handleToken("");
    navigate("/");
  };

  return (
    <header>
      <Link id="homeLink" to={"/todo"}>
        <img
          src="https://learn.masaischool.com/img/logo-navbar.svg"
          alt="Home"
        />
        todos
      </Link>

      <div id="iconDiv">
        <img
          src="https://learn.masaischool.com/img/notif-icon.svg"
          alt="reminder"
        />

        <button id="logoutBtn" onClick={logout}>
          {" "}
          {token === null ? "Login" : "Logout"}
        </button>
        <img
          id="userIcon"
          src="https://learn.masaischool.com/img/user-icon.svg"
          alt="User"
        />
      </div>
    </header>
  );
};
