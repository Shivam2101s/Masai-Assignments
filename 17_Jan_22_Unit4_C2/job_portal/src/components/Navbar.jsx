import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css"

export const Navbar = () => {
    const {token, handleToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = () => {
        handleToken("");
        navigate("/");
      };
    
       
     

    return ( 
        <div id="navbar">
             <Link id="homeLink" to={"/todo"}>
        <img id="homeIcon"
          src="https://www.realjobportal.com/images/logo.png"
          alt="Home"
        />
      </Link>

      
      <button id="logoutBtn" onClick={logout}>
          {" "}
          {token === null ? "Login" : "Logout"}
        </button>
        </div>

    )
}
