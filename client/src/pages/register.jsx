import { useState } from "react";
import {usuarioService} from "../api/auth.api";
import { useNavigate } from 'react-router-dom';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import './register.css';

export function Register(){
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        fecha_nac: '',
        password: '',
        role: 'user'
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        const { nombre, apellidos, password, fecha_nac, email} = formData;

        // 1. Validar campos vacíos o solo espacios
        if (!nombre.trim() || !apellidos.trim()) {
            alert("Por favor, completa nombre y apellidos correctamente.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email))
        {
            alert("por favor, complete el email.");
            return false;
        }


        // 2. Validar mayoría de edad (18 años)
        const hoy = new Date();
        const cumple = new Date(fecha_nac);
        let edad = hoy.getFullYear() - cumple.getFullYear();
        const mes = hoy.getMonth() - cumple.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < cumple.getDate())) {
            edad--;
        }

        if (edad < 18) {
            alert("Debes ser mayor de 18 años para registrarte.");
            return false;
        }

        // 3. Validar Contraseña: Mín 8 caracteres, 1 Mayúscula, 1 Minúscula, 1 Número
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passRegex.test(password)) {
            alert("La contraseña no cumple con los requisitos de seguridad.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        try {
            // Reemplaza con tu llamada real a la API
            await usuarioService.registro(formData);
            alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
            navigate('/login');
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Error al registrarse";
            alert(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-main-container">
            <div className="register-container">
                <h2>Crear nueva cuenta</h2>
                <p>Completa tus datos para empezar</p>

                <form onSubmit={handleSubmit} noValidate>
                    {/* Fila de Nombre y Apellidos */}
                    <div className="input-group-row">
                        <div className="input-field">
                            <label>Nombre</label>
                            <input
                                name="nombre"
                                type="text"
                                placeholder="Ej: María"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-field">
                            <label>Apellidos</label>
                            <input
                                name="apellidos"
                                type="text"
                                placeholder="Ej: Flor de Jara"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="input-field">
                        <label>Correo Electrónico</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="maria@ejemplo.com"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Fecha de Nacimiento */}
                    <div className="input-field">
                        <label>Fecha de Nacimiento</label>
                        <input
                            name="fecha_nac"
                            type="date"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Contraseña con Ojo de Visibilidad */}
                    <div className="input-field">
                        <label>Contraseña</label>
                        <div className="input-with-icon">
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Mín. 8 caracteres"
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password-btn"
                                onClick={togglePasswordVisibility}
                                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            >
                                {showPassword ? 
                                (
                                <IoEyeOffOutline size={20} color="#000000" />
                                ) : (
                                <IoEyeOutline size={20} color="#000000" />
                                )
                                }
                            </button>
                        </div>
                        
                        {/* Indicadores visuales de requisitos */}
                        <ul className="password-requirements">
                            <li className={formData.password.length >= 8 ? 'meet' : ''}>Mín. 8 caracteres</li>
                            <li className={/[A-Z]/.test(formData.password) ? 'meet' : ''}>Una Mayúscula</li>
                            <li className={/\d/.test(formData.password) ? 'meet' : ''}>Un número</li>
                        </ul>
                    </div>

                    {/* Botón Submit */}
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Procesando...' : 'Registrarse'}
                    </button>
                </form>

                <div className="register-footer">
                    ¿Ya tienes cuenta? <span onClick={() => navigate('/login')}>Inicia sesión</span>
                </div>
            </div>
        </div>
    );
}