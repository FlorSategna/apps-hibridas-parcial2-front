import { useState, useEffect } from "react"
import { fetchPrivado } from "../service/api"
function Admin(){

    const [ usuarios, setUsuarios] = useState([]);
    const endPoint = '/api/usuarios'
    useEffect(  () => {
        async function getUsuarios() {
            try {
                const res = await fetchPrivado(endPoint)
                setUsuarios( res.data);
            } catch (error) {
                console.error(error)
            }
        }

        getUsuarios()
    }, [] )
    return (
        <section>
            <h1>Panel del Administrador</h1>
            <p> En esta sección desarrollaremos el Panel del Administrador</p>

            <h2>Usuarios</h2>
            <div className="container">
            {
                usuarios.map( usuario => (
                    <div className="card" key={ usuario._id}>
                        <h4>{ usuario.name }</h4>
                        <p>{ usuario.email }</p>
                    </div>
                ))
            }
            </div>

        </section>
    )
}

export default Admin