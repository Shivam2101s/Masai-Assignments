import "./App.css";
import { Todo } from "./components/Todo";
import { Navbar} from "./components/Navbar";
import { EditTodo } from "./components/EditTodo";
import { Route, Routes, Link } from "react-router-dom";
import { Details } from "./components/Details";
import { Login } from "./components/Login";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route
          path="/todo"
          element={
            <PrivateRoute>
              <Todo />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/todo/:id/edit"
          element={
            <PrivateRoute>
              <EditTodo />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/todo/:id"
          element={
            <PrivateRoute>
              <Details />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}
export default App;
