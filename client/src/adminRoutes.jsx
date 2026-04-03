import {Navigate, Outlet} from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

export const AdminRoute = () => {
    const {user, loading, isAuthenticated} = useAuth();

    if (loading) return <p>verificando credenciales....</p>;

    if(!isAuthenticated || user?.role !=='admin'){
        return <Navigate to="/" replace/>;
    }

    return <Outlet/>;
}
