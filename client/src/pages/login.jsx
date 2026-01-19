import "../pages/login.css";
import { MdOutlineMail } from "react-icons/md";
import {
  IoLockOpenOutline,
  IoLockClosedOutline,
  IoLogInOutline,
  IoMailOutline,
} from "react-icons/io5";
import { useState, useEffect } from "react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  useEffect(() => {
    const isValidEmail = emailRegex.test(email);
    setValidEmail(isValidEmail);
  }, [email]);

  useEffect(() => {
    const isValidPassword = passwordRegex.test(password);
    setValidPassword(isValidPassword);
  }, [password]);

  return (
    <main className="main_login">
      <div className="main_div_left">
        <h1>Hola, bienvenido</h1>
        <p>
          ¿Todavía no tienes cuenta? <a href="#">¡Crea una ahora!</a>
        </p>
      </div>
      <div className="main_div_right">
        <form className="div_right_form">
          <h1 className="form_title">Iniciar sesión</h1>

          <label className="form_label">E-mail</label>
          <div className="input_wrapper">
            <input
              className={`form_input ${email === null ? "form_input" : validEmail ? "form_input_valid" : "form_input_invalid"}`}
              type="email"
              placeholder="correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <IoMailOutline
              size={20}
              style={validEmail ? { color: "#06d7a0" } : { color: "#ea3b3b" }}
            />
          </div>
          <br />
          <label className="form_label">Contraseña</label>
          <div className="input_wrapper">
            <input
              className={`form_input ${password === null ? "form_input" : validPassword ? "form_input_valid" : "form_input_invalid"}`}
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <IoLockClosedOutline
              size={20}
              style={
                validPassword ? { color: "#06d7a0" } : { color: "#ea3b3b" }
              }
            />
          </div>

          <button className="form_button" type="submit">
            Acceder <IoLogInOutline size={20} />
          </button>
        </form>
      </div>
    </main>
  );
}
