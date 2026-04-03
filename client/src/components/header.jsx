import { Link, useNavigate } from "react-router-dom"; // 1. Cambiamos Navigate por useNavigate
import logo from "../assets/logoMariaflordejara.jpg";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import "./header.css";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // 2. Inicializamos el hook de navegación
  const { totalItems } = useCart();

  // 3. Extraemos logoutSync del contexto
  const { isAuthenticated, user, logoutSync } = useAuth();

  const handleLogout = () => {
    // 4. Usamos la función del contexto que ya limpia localStorage y el estado
    logoutSync();

    // 5. Redirigimos al inicio usando la función navigate
    navigate("/login");

    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="navbar">
      <Link to="/Inicio" className="logo">
        <img src={logo} alt="MariaFlorDeJara" />
      </Link>

      <nav className={`links ${isMenuOpen ? "show" : ""}`}>
        <Link to="/Inicio" onClick={() => setIsMenuOpen(false)}>
          Inicio
        </Link>
        <Link to="/products" onClick={() => setIsMenuOpen(false)}>
          Productos
        </Link>
        <Link to="/contacto" onClick={() => setIsMenuOpen(false)}>
          Contacto
        </Link>

        {isAuthenticated ? (
          <>
            {/* Usamos el signo ? por si user tarda un poco en cargar */}
            <Link to="/perfil" onClick={() => setIsMenuOpen(false)}>
              Hola, {user?.nombre}
            </Link>
            <button onClick={handleLogout} className="btn_logout">
              Cerrar Sesión
            </button>
            <div className="cart-icon-container">
              <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                <FaShoppingCart />
                {totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
              </Link>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
          </>
        )}
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
