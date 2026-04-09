import axios from "axios";

export const api = axios.create({
    // baseURL: "http://localhost:3000",
    baseURL: "https://apimariaflordejara-188m.vercel.app",
    withCredentials: true,
    // headers: {
    //     'Content-Type': 'application/json'
    // }
});

api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if(error.response) {
            const {status} = error.response;

            if(status === 401)
            {
                console.warn("sesion no valida o expirada. Redirigiendo");
                localStorage.clear('user');
                
                window.location.href = '/login';
                
            }

            if(status === 403){
                console.error("No tienes permisos para realizar esta acción");
                alert("Acceso denegado: se requiere el rol de administrador");
            }
        }

        return Promise.reject(error);
    }
)