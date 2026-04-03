import "../pages/login.css";
import { IoLockClosedOutline, IoLogInOutline, IoMailOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { usuarioService } from "../api/auth.api"; // Tu servicio con Axios
import { useNavigate, Link } from "react-router-dom"; // Para navegar
import { useAuth } from '../context/AuthContext.jsx';

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const {loginSync} = useAuth();
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Al menos 8 caracteres, una letra y un número
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  useEffect(() => {
    setValidEmail(emailRegex.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(passwordRegex.test(password));
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Opcional: Bloquear el envío si no son válidos
    if (!validEmail || !validPassword) {
      alert("Por favor, rellena los campos correctamente.");
      return;
    }

    try {
      const credenciales = { email, password };
      const res = await usuarioService.login(credenciales);
      
      console.log("Sesión iniciada correctamente");
      
      // ¡Al usar Cookies, el navegador ya guardó el token solo!

      loginSync(res.user);
      navigate("/perfil"); 
    } catch (error) {
      alert(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  // Función para determinar la clase de CSS
  const getStatusClass = (value, isValid) => {
  // 1. Si no hay nada escrito, clase base
  if (value.length === 0) return "form_input"; 
  
  // 2. Si hay algo, aplicamos la clase de validación
  // IMPORTANTE: Asegúrate de que en el CSS estas clases existan
  return isValid ? "form_input form_input_valid" : "form_input form_input_invalid";
};

  return (
    <main className="main_login">
      <div className="main_div_left">
        <h1>Hola, bienvenido</h1>
        <p>
          ¿Todavía no tienes cuenta? <Link to="/register">¡Crea una ahora!</Link>
        </p>
      </div>
      <div className="main_div_right">
        <form className="div_right_form" onSubmit={handleSubmit}>
          <h1 className="form_title">Iniciar sesión</h1>

          <label className="form_label">E-mail</label>
          <div className="input_wrapper">
            <input
              className={getStatusClass(email, validEmail)}
              type="email"
              placeholder="correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <IoMailOutline
              className="input_icon"
              size={20}
              style={{ color: email === "" ? "#ccc" : validEmail ? "#06d7a0" : "#ea3b3b" }}
            />
          </div>

          <label className="form_label">Contraseña</label>
          <div className="input_wrapper">
            <input
              className={getStatusClass(password, validPassword)}
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <IoLockClosedOutline
              className="input_icon"
              size={20}
              style={{ color: password === "" ? "#ccc" : validPassword ? "#06d7a0" : "#ea3b3b" }}
            />
          </div>

          <button 
            className="form_button" 
            type="submit" 
            disabled={!validEmail || !validPassword} // Desactivar si hay errores
          >
            Acceder <IoLogInOutline size={20} />
          </button>
        </form>
      </div>
    </main>
  );
}