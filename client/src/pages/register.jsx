import { useState } from "react";
import {usuarioService} from "../api/auth.api";
import { useNavigate } from 'react-router-dom';
import './register.css';

export function Register(){
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre:'',
        apellidos:'',
        fecha_nac:'',
        password:'',
        email:'',
        role: 'user'
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await usuarioService.registro(formData);
            alert("¡Cuenta creada con exito! Ahora puedes iniciar sesion");
            navigate('/login');
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Error al registrarse";
            alert(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="register-main-container">
        <div className="register-container">
            <h2>Crear nueva cuenta</h2>
            <form onSubmit={handleSubmit}>
                <input name="nombre" placeholder="Ej: mariaflordejara" onChange={handleChange} required/>
                <input name="apellidos" placeholder="Ej: flordejara" onChange={handleChange} required />
                <input name="email" type="email" placeholder="Ej: mariaflordejara@gmail.com" onChange={handleChange} required/>
                <input name="fecha_nac" type="date" onChange={handleChange} required/>
                <input name="password" type="password" placeholder="Ej: contraseñasegura123" onChange={handleChange} required/>

                <button type="submit" disabled={loading}>
                    {loading ? 'Procesando...': 'Registrarse'}
                </button>
            </form>
        </div>
        </div>
    )
}