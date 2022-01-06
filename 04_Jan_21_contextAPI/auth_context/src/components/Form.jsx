import "./Form.css"
import {AuthContext} from "../context/AuthContext"
import { useContext, useState } from "react"

export const Form = () => {
    const [text,setText] = useState([]);
    const {token,isAuth,handleLogin} = useContext(AuthContext);
      
    const handleChange = (e) => {
        const {name,value} = e.target;
        setText({
            ...text,
            [name]:value
        });
          
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(text);
        console.log(text);
    }
    

 return <>
 {isAuth==="Log Out"? (<div className="welcome"> <img src="https://www.animatedimages.org/data/media/707/animated-welcome-image-0112.gif"alt="" /><p><b>Token No.:</b> {token}</p> </div>):(<div className="formDiv">
     <p><b>User</b> Login</p>
     <form onSubmit={handleSubmit}>
         <input type="text" onChange={handleChange} name="username" placeholder="Email or Username" required/>
         <input type="password" onChange={handleChange} name="password" placeholder="Password" required/>
         <input type="submit" id="submit" value="Submit" />
     </form>
 </div>)} 
 </>
}