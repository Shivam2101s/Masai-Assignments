import './App.css';
import { Route, Routes, Link } from "react-router-dom";
import {Login} from "./components/Login"
import {Navbar} from "./components/Navbar"
import {AddJobs} from "./components/AddJobs"
import {Jobs} from "./components/Jobs"
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
       <Route path="/jobs" element={<Jobs/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
