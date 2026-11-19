import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.png' 


function Nav(){

    const { user, autenticado, logout } = useAuth();
    const navigate = useNavigate();

    function cerrarSesion(){
        logout();
        navigate('/login');
    }

    return (

        <header>
        <div className="marca">
            <img src={ logo } alt='logo' />
            <h1> Movies Reviews</h1>
        </div>

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
                <p> Hola, { user.name } !</p>
            </>
            ) : ( 
            <> 
                <Link to='/'> Inicio</Link> |
                <Link to='/login'> Iniciar Sesión</Link> |
                <Link to='/register'> Crear cuenta</Link>

                
            </> )
        }

      </nav>
    </header>
    )
}

export default Nav