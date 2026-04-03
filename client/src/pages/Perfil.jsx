import { useEffect, useState } from 'react';
import { usuarioService } from '../api/auth.api';
import './Perfil.css';

export function Perfil() {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const data = await usuarioService.obtenerPerfil();
                setUsuario(data);
            } catch (error) {
                console.error("No se pudo cargar el perfil", error);
                // El interceptor de Axios ya debería manejar el redireccionamiento si falla
            } finally {
                setLoading(false);
            }
        };

        cargarDatos();
    }, []);

    if (loading) return <div className="loader">Cargando perfil...</div>;

    if (!usuario) return <div className="error">No se encontró información del usuario.</div>;

    return (
        <main className="perfil-main-container">
            <div className="perfil-card">
                <div className="perfil-header">
                    <div className="avatar-circle">
                        {usuario.nombre.charAt(0).toUpperCase()}
                    </div>
                    <h1>Bienvenido, {usuario.nombre}</h1>
                    <span>{usuario.role === 'admin' ? 'Administrador' : 'Usuario'}</span>
                </div>

                <div className="perfil-info">
                    <div className="info-group">
                        <label>Nombre completo:</label>
                        <p>{usuario.nombre} {usuario.apellidos}</p>
                    </div>
                    <div className="info-group">
                        <label>Correo electrónico:</label>
                        <p>{usuario.email}</p>
                    </div>
                    <div className="info-group">
                        <label>Fecha de nacimiento:</label>
                        <p>{usuario.fecha_nac}</p>
                    </div>
                </div>

                <button 
                    className="logout-button" 
                    onClick={() => {
                        // Aquí llamarías a tu función de logout que borra la cookie
                        localStorage.clear();
                        window.location.href = '/login';
                    }}
                >
                    Cerrar Sesión
                </button>
            </div>
        </main>
    );
}