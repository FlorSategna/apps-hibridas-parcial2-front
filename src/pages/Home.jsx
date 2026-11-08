import { useState, useEffect } from 'react'
import { obtenerPeliculas } from '../service/api.js'


function Home(){
    const [ error, setError] = useState('');
    const [ peliculas, setPeliculas ] = useState( [] );

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
        getPeliculas();

    }, [])

    return(
        <>
            <h1>Page home</h1>
            <h4>Lista de películas</h4>

            <p>{ error}</p>
            <ul>
                {
                    peliculas.map(  pelicula => 
                                <li key={ pelicula._id}> { pelicula.title } ({ pelicula.year }) </li>
                                )
                }
            </ul>
        </>
    )
}

export default Home