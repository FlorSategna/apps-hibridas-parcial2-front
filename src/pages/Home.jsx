import { useState, useEffect } from 'react'
import { obtenerPeliculas, obtenerGeneros } from '../service/api.js'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL;

function Home(){
    const [ error, setError] = useState('');
    const [ peliculas, setPeliculas ] = useState( [] );
    const [ generos, setGeneros ] = useState( [] );
    const navigate = useNavigate();

    useEffect( () => {
        async function getPeliculas(){
            try {
                const result = await obtenerPeliculas();
                setPeliculas( result.data);
            } catch (error) {
                console.log(error);
                setError('No pudimos obtener las películas :(')
            }
        }
        async function getGeneros(){
            try {
                const result = await obtenerGeneros();
                setGeneros( result.data);
            } catch (error) {
                console.log(error);
            }
        }

        getPeliculas();
        getGeneros();

    }, [])

    return(
        <>
            <h1>Inicio</h1>
            <h4>Lista de películas</h4>

            <p>{ error}</p>
            <div className="container">
                {
                    peliculas.map(  pelicula => (
                        <div className="card" key={ pelicula._id }>
                            {
                                pelicula.image ? (
                                    <img src={ `${API_URL}${pelicula.image}` } alt={ pelicula.title } />
                                ) : (
                                    <div className="sin-imagen">Sin imagen</div>
                                )
                            }
                            <h4>{ pelicula.title } ({ pelicula.year })</h4>
                            <p>{ generos.find( genero => genero._id === pelicula.genre )?.name }</p>
                            <button onClick={ () => navigate( `/peliculas/${pelicula._id}` ) }> Ver reseñas</button>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Home