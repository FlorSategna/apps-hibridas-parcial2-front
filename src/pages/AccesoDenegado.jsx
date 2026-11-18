import { Link } from "react-router-dom"

function AccesoDenegado(){

    return (
        <section>
            <h2>Acceso Denegado | Error 403</h2>

            <p>No tenés permisos para acceder a esta página.</p>

            <Link to="/">Regresar al Inicio </Link>
        </section>
    )
}

export default AccesoDenegado