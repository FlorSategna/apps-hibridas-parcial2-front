import { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { obtenerPelicula, obtenerReviewsPorPelicula } from '../service/api.js'
import FormReview from '../components/FormReview.jsx'


function PeliculaDetalle(){
    const { id } = useParams();
    const { user, autenticado } = useAuth();
    const location = useLocation();

    const [ error, setError] = useState('');
    const [ pelicula, setPelicula ] = useState( null );
    const [ reviews, setReviews ] = useState( [] );

    useEffect( () => {
        async function getPelicula(){
            try {
                const result = await obtenerPelicula( id);
                setPelicula( result.data);
            } catch (error) {
                console.log(error);
                setError('No pudimos obtener la película :(')
            }
        }

        async function getReviews(){
            try {
                const result = await obtenerReviewsPorPelicula( id);
                setReviews( result.data);
            } catch (error) {
                console.log(error);
                setError('No pudimos obtener las reseñas :(')
            }
        }

        getPelicula();
        getReviews();
    }, [id])

    function agregarReview( nueva){
        const review = { ...nueva, user: { _id: user.id, name: user.name } };
        setReviews( [ review, ...reviews ]);
    }

    if( !pelicula){
        return <p>{ error || 'Cargando película...' }</p>
    }

    return(
        <>
            <Link to='/'> Volver al inicio</Link>

            <h1>{ pelicula.title } ({ pelicula.year })</h1>
            <h4>Género: { pelicula.genre?.name }</h4>
            <p>{ pelicula.description }</p>

            <h2>Reseñas</h2>

            {
                autenticado ? (
                    <FormReview movie={ id } onCreada={ agregarReview } />
                ) : (
                    <p> <Link to='/login' state={{ from: location }}>Iniciá sesión</Link> para escribir una reseña.</p>
                )
            }

            <p>{ error}</p>

            {
                reviews.length === 0 && (
                    <p>Todavía no hay reseñas para esta película.</p>
                )
            }

            <div className="container">
            {
                reviews.map( item => (
                    <div className="card" key={ item._id }>
                        <h4>{ item.user?.name }</h4>
                        <p><strong>Puntaje:</strong> { item.rating } / 5</p>
                        <p>{ item.comment }</p>
                    </div>
                ))
            }
            </div>
        </>
    )
}

export default PeliculaDetalle