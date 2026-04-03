import { api } from "./axios";

export const usuarioService = {

    registro: async (datosUsuario) => {
        const {data} = await api.post('/usuarios/register', datosUsuario);
        return data;
    },

    login: async (credenciales) => {
        const {data} = await api.post('/usuarios/login', credenciales);
        return data;
    },

    obtenerPerfil: async () => {
        const {data} = await api.get('/usuarios/perfil');
        return data;
    },

    logout: async () => {
    try {
        // 1. Avisamos al backend para que borre la cookie (res.clearCookie('token'))
        await api.post('/usuarios/logout');
    } catch (error) {
        console.error("Error al avisar al servidor del logout", error);
    } finally {
        // 2. Pase lo que pase, limpiamos el rastro local para bloquear las rutas
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userName");
        window.location.href = '/login';
    }
}
}