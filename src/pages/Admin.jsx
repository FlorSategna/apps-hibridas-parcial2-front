import { useState, useEffect } from "react"
import { obtenerGeneros } from "../service/api"

import AdminPeliculas from "../components/AdminPeliculas"
import AdminGeneros from "../components/AdminGeneros"
import AdminReviews from "../components/AdminReviews"

function Admin(){

    const [ generos, setGeneros ] = useState([]);
    const [ error, setError ] = useState('');

    useEffect(  () => {
        async function getGeneros() {
            try {
                const res = await obtenerGeneros();
                setGeneros( res.data);
            } catch (error) {
                console.error(error);
                setError('No pudimos obtener los géneros');
            }
        }

        getGeneros();
    }, [] )

    return (
        <section>
            <h1>Panel del Administrador</h1>
            <p>{ error }</p>

            <AdminPeliculas generos={ generos } />

            <hr />
            <AdminGeneros generos={ generos } setGeneros={ setGeneros } />

            <hr />
            <AdminReviews />
        </section>
    )
}

export default Admin