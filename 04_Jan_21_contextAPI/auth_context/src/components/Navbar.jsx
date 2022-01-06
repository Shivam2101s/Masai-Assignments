import { useContext } from "react"
import {AuthContext} from "../context/AuthContext"
import "./Navbar.css"

export const Navbar = () => {
    const {isAuth,setIsAuth} = useContext(AuthContext)

   return <div className="navbar">
       <button>Home</button>
    <button onClick={() =>{
        setIsAuth("Log In")
    }}>{isAuth}</button>
    </div>
}