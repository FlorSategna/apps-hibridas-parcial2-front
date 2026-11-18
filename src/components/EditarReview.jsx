import { useState } from 'react'
import { editarReview } from '../service/api.js'

function EditarReview({ review, movie, onEditada, onCancelar }){

    const [ error, setError ] = useState('');

    const [ datos, setDatos ] = useState({
        rating: review.rating,
        comment: review.comment || ''
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setDatos( { ...datos, [name]: value});
    }

    async function handleSubmitEditar(event){
        event.preventDefault();
        setError('');

        const { comment } = datos;
        const rating = Number( datos.rating);

        try {
            const res = await editarReview( review._id, movie, rating, comment );
            onEditada( res.data);
        } catch (error) {
            setError( error.message);
        }
    }

    return (
        <form onSubmit={ handleSubmitEditar }>
            <label htmlFor="rating">Puntaje (1 a 5)</label>
            <input type="number" name='rating' value={ datos.rating } onChange={ handleChange } required min={1} max={5} />

            <label htmlFor="comment">Comentario</label>
            <textarea name='comment' value={ datos.comment } onChange={ handleChange } maxLength={256} />

            <button type='submit'> Guardar cambios</button>
            <button type='button' className="btn-secondary" onClick={ onCancelar }> Cancelar</button>

            <p>{ error }</p>
        </form>
    )
}

export default EditarReview