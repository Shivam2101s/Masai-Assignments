import './App.css';
import { Route, Routes, Link } from "react-router-dom";
import {Login} from "./components/Login"
import {Navbar} from "./components/Navbar"

function App() {
  return (
    <div className="App">
      <Navbar/>
     <Routes>
       <Route path="/" element={<Login />}></Route>
     </Routes>
    </div>
  );
}

export default App;
