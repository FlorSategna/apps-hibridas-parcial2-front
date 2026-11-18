import { useState, useEffect } from 'react'
import { obtenerGeneros } from '../service/api'
import AdminPeliculas from '../components/AdminPeliculas'
import AdminGeneros from '../components/AdminGeneros'
import AdminReviews from '../components/AdminReviews'

function Admin(){

    const [ generos, setGeneros ] = useState([]);
    const [ error, setError ] = useState('');
    const [ tab, setTab ] = useState('peliculas');

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

            <button className={ tab === 'peliculas' ? '' : 'btn-secondary' } onClick={ () => setTab('peliculas') }> Películas</button>
            <button className={ tab === 'generos' ? '' : 'btn-secondary' } onClick={ () => setTab('generos') }> Géneros</button>
            <button className={ tab === 'reviews' ? '' : 'btn-secondary' } onClick={ () => setTab('reviews') }> Reseñas</button>

            <hr />

            { tab === 'peliculas' && <AdminPeliculas generos={ generos } /> }
            { tab === 'generos' && <AdminGeneros generos={ generos } setGeneros={ setGeneros } /> }
            { tab === 'reviews' && <AdminReviews /> }
        </section>
    )
}

export default Admin