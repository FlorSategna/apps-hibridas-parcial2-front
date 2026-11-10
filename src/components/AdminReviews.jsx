import { useState, useEffect } from "react"
import { obtenerReviews, editarReview, borrarReview } from "../service/api"

function AdminReviews(){

    const [ reviews, setReviews ] = useState([]);
    const [ error, setError ] = useState('');
    const [ mensaje, setMensaje ] = useState('');
    const [ editando, setEditando ] = useState(null);

    // Estados para el formulario de edición de la reseña
    const [ review, setReview ] = useState({
        rating: '',
        comment: ''
    });

    useEffect(  () => {
        async function getReviews() {
            try {
                const res = await obtenerReviews();
                setReviews( res.data);
            } catch (error) {
                console.error(error);
                setError('No pudimos obtener las reseñas');
            }
        }

        getReviews();
    }, [] )

    function handleChange(event) {
        const { name, value } = event.target;
        setReview( { ...review, [name]: value});
    }

    function handleEditar(item){
        setError('');
        setMensaje('');
        setReview({ rating: item.rating, comment: item.comment || '' });
        setEditando( item);
    }

    function handleCancelar(){
        setReview({ rating: '', comment: ''});
        setEditando( null);
        setError('');
    }

    async function handleSubmitReview(event){
        event.preventDefault();
        setError('');
        setMensaje('');

        const { comment } = review;
        const rating = Number( review.rating);

        try {
            await editarReview( editando._id, editando.movie._id, rating, comment );
            setReviews( reviews.map( item => item._id === editando._id ? { ...item, rating, comment } : item));
            setReview({ rating: '', comment: ''});
            setEditando( null);
            setMensaje('Reseña editada correctamente');
        } catch (error) {
            setError( error.message);
        }
    }

    async function handleBorrar(id){
        if( !window.confirm('¿Seguro que querés borrar la reseña?')){
            return;
        }

        setError('');
        setMensaje('');

        try {
            await borrarReview( id);
            setReviews( reviews.filter( item => item._id !== id));
            setMensaje('Reseña borrada correctamente');
        } catch (error) {
            setError( error.message);
        }
    }

    return (
        <section>
            <h2>Reseñas</h2>

            {
                editando && (
                    <>
                        <h3>Editar reseña de { editando.movie?.title }</h3>
                        <form onSubmit={ handleSubmitReview }>
                            <label htmlFor="rating">Puntaje (1 a 5)</label>
                            <input type="number" name='rating' value={ review.rating } onChange={ handleChange } required min={1} max={5} />

                            <label htmlFor="comment">Comentario</label>
                            <textarea name='comment' value={ review.comment } onChange={ handleChange } maxLength={256} />

                            <button type='submit'> Guardar cambios</button>
                            <button type='button' onClick={ handleCancelar }> Cancelar</button>
                        </form>
                    </>
                )
            }

            <p>{ mensaje }</p>
            <p>{ error }</p>

            <div className="container">
            {
                reviews.map( item => (
                    <div className="card" key={ item._id }>
                        <h4>{ item.movie?.title }</h4>
                        <p><strong>Puntaje:</strong> { item.rating } / 5</p>
                        <p>{ item.comment }</p>
                        <button onClick={ () => handleEditar( item ) }> Editar</button>
                        <button onClick={ () => handleBorrar( item._id ) }> Borrar</button>
                    </div>
                ))
            }
            </div>

        </section>
    )
}

export default AdminReviews