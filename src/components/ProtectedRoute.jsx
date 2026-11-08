import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom"

function ProtectedRoute(){
    const { autenticado } = useAuth();
    const location = useLocation();

    if( autenticado ){
        return <Outlet />
    }

    return <Navigate to='/login' replace state={{ from: location}} />
}

export default ProtectedRoute