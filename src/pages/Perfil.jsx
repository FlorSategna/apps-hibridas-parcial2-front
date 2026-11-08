import { useAuth } from "../context/AuthContext";


function Perfil(){

    const { user } = useAuth();

    return(
        <section>
            <h2>Mi Perfil</h2>
            <ul>
                <li><strong>Nombre:</strong> { user?.name }</li>
                <li><strong>Rol:</strong> { user?.role}</li>
            </ul>
        </section>
    )

}

export default Perfil