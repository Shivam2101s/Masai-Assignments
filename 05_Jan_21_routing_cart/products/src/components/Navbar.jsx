import "./Navbar.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div id="navbar">
      <img src="https://www.freeiconspng.com/thumbs/cart-icon/shopping-cart-icon-19.png" alt="" />
      <Link className="link" to="/">
        Home
      </Link>
      <Link className="link" to="/products">
       Products
      </Link>
    </div>
  );
};
