import "../pages/login.css";
import { IoLockClosedOutline, IoLogInOutline, IoMailOutline, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { usuarioService } from "../api/auth.api"; // Tu servicio con Axios
import { useNavigate, Link } from "react-router-dom"; // Para navegar
import { useAuth } from '../context/AuthContext.jsx';

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Nuevo estado
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  
  const { loginSync } = useAuth();
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  useEffect(() => {
    setValidEmail(emailRegex.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(passwordRegex.test(password));
  }, [password]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validEmail || !validPassword) return;

    try {
      const credenciales = { email, password };
      const res = await usuarioService.login(credenciales);
      loginSync(res.user);
      navigate("/perfil"); 
    } catch (error) {
      alert(error.response?.data?.message || "Error al iniciar sesión", error);
    }
  };

  const getStatusClass = (value, isValid) => {
    if (value.length === 0) return "form_input"; 
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
              type={showPassword ? "text" : "password"} // Tipo dinámico
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Icono de validación (izquierda) */}
            <IoLockClosedOutline
              className="input_icon"
              size={20}
              style={{ color: password === "" ? "#ccc" : validPassword ? "#06d7a0" : "#ea3b3b" }}
            />
            
            {/* Botón de visibilidad (derecha) */}
            <button
              type="button"
              className="toggle_password_login"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? (
                <IoEyeOffOutline size={20} color="#000000" />
              ) : (
                <IoEyeOutline size={20} color="#000000" />
              )}
            </button>
          </div>

          <button 
            className="form_button" 
            type="submit" 
            disabled={!validEmail || !validPassword}
          >
            Acceder <IoLogInOutline size={20} />
          </button>
        </form>
      </div>
    </main>
  );
}