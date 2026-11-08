import { Link } from "react-router-dom"

function AccesoDenegado(){

    return (
        <section>
            <h2>Acceso Denegado | Error 403</h2>

            <p>No tenes permisos para acceder a este recurso</p>

            <Link to="/">Regresar al Inicio </Link>
        </section>
    )
}

export default AccesoDenegado