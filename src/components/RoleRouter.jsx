import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom"
//  ejemplo: rolesPermitidos = ['admin', 'teacher', ...]
function RoleRoute( { rolesPermitidos } ){
    const { user, autenticado } = useAuth();
    // Verificamos AUTENTICACIÓN: Quien soy
    if( !autenticado){
        return <Navigate to='/login' replace />
    }
    // Verificamos AUTORIZACIÓN: Que puedo hacer
    if(  !rolesPermitidos.includes( user?.role  )  ){
        return <Navigate to='/acceso-denegado' replace />
    }

    return <Outlet />
}

export default RoleRoute;