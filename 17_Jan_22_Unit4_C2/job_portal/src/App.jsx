import './App.css';
import { Route, Routes, Link } from "react-router-dom";
import {Login} from "./components/Login"
import {Navbar} from "./components/Navbar"
import {AddJobs} from "./components/AddJobs"
import {PrivateRoute} from "./components/PrivateRoute"

function App() {
  return (
    <div className="App">
      <Navbar/>
     <Routes>
       <Route path="/" element={<Login />}></Route>
       <Route path="/addjobs" element={
       <PrivateRoute><AddJobs/></PrivateRoute>
       }></Route>
     </Routes>
    </div>
  );
}

export default App;
