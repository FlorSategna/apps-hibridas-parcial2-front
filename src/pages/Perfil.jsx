import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function Perfil(){

    const { user } = useAuth();

    return(
        <section>
            <h2>Mi Perfil</h2>
            <div className="container">
                <div className="card">
                    <p><strong>Nombre:</strong> { user?.name }</p>
                    <p><strong>Rol:</strong> { user?.role }</p>
                    <Link to='/'> Ver películas</Link>
                    {
                        user?.role === 'admin' && <p><Link to='/admin'> Ir al panel</Link></p>
                    }
                </div>
            </div>
        </section>
    )

}

export default Perfil