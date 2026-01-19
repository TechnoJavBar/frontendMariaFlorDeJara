import { Link } from "react-router-dom";
import logo from "../assets/logoMariaflordejara.jpg";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import "./header.css";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="navbar">
      <Link to="/Inicio" className="logo">
        <img src={logo} alt="MariaFlorDeJara" />
      </Link>
      <nav className={`links ${isMenuOpen ? "show" : ""}`}>
        <Link to="/Inicio">Inicio</Link>
        <Link to="/products">Productos</Link>
        <Link to="/contacto">Contacto</Link>
        <Link to="/login">Login</Link>
        <Link to="/cart">
          <FaShoppingCart />
        </Link>
      </nav>

      <div
        className={`hamburger ${isMenuOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
};
