import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext' 


function Nav(){

    const { user, autenticado, logout } = useAuth();
    const navigate = useNavigate();

    function cerrarSesion(){
        logout();
        navigate('/login');
    }

    return (
      <nav>
        {
            autenticado ? (
            <>
                <Link to='/'> Inicio</Link> |
                <Link to='/perfil'> Mi Perfil</Link> 

                {
                    user?.role === 'admin' && ( 
                       <> | <Link to='/admin'> Admin</Link> </> 
                    )
                }

                <br />
                <button onClick={ cerrarSesion} > Cerrar Sesión</button>
                <p> Hola! { user.name } </p>
            </>
            ) : ( 
            <> 
                <Link to='/'> Inicio</Link> |
                <Link to='/login'> Iniciar Sesión</Link> |
                <Link to='/register'> Crear cuenta</Link>

                
            </> )
        }

      </nav>
    )
}

export default Nav