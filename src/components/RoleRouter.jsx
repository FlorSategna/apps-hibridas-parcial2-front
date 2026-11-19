import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom"
function RoleRoute( { rolesPermitidos } ){
    const { user, autenticado } = useAuth();
    if( !autenticado){
        return <Navigate to='/login' replace />
    }
    if(  !rolesPermitidos.includes( user?.role  )  ){
        return <Navigate to='/acceso-denegado' replace />
    }

    return <Outlet />
}

export default RoleRoute;