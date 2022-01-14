import "./App.css";
import { Navbar } from "./components/Navbar";
import {Home} from "./components/Home"
import { Products } from "./components/Products";
import {ProductDetails} from "./components/ProductDetails"
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/products" element={<Products />}></Route>

        <Route path="/products/:id" element={<ProductDetails />}></Route>

      </Routes>
    </div>
  );
}



export default App;
