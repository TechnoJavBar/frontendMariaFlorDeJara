import {Button} from './button.jsx'
import {Link} from 'react-router-dom'
import logo from '../assets/logoMariaflordejara.jpg'
import { useState } from "react";
import './header.css'

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header w-100 bg-black shadow-sm">
      <div className="container-fluid d-flex align-items-center justify-content-between py-2 px-3">
        
        {/* Logo */}
        <div className="header-div">
          <Link to="/">
            <img src={logo} alt="Logo MariaFlorDeJara" height="50" />
          </Link>
        </div>

        {/* Botón hamburguesa móvil */}
        <button
          className="d-lg-none btn border-0 bg-info"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú */}
        <nav
          className={`header-nav d-lg-flex flex-column flex-lg-row gap-3 ${
            menuOpen ? "d-flex" : "d-none d-lg-flex"
          }`}
        >
          <Link to="/Inicio" onClick={() => setMenuOpen(false)}>
            <Button text="Inicio" />
          </Link>
          <Link to="/products" onClick={() => setMenuOpen(false)}>
            <Button text="Productos" />
          </Link>
          <Link to="/contacto" onClick={() => setMenuOpen(false)}>
            <Button text="Contacto" />
          </Link>
          <Button text="Carrito" />
        </nav>
      </div>
    </header>
  );
};