import { useState } from 'react'
import { crearReview } from '../service/api.js'

function FormReview({ movie, onCreada }){

    const [ error, setError ] = useState('');
    const [ mensaje, setMensaje ] = useState('');

    const [ review, setReview ] = useState({
        rating: '',
        comment: ''
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setReview( { ...review, [name]: value});
    }

    async function handleSubmitReview(event){
        event.preventDefault();
        setError('');
        setMensaje('');

        const { comment } = review;
        const rating = Number( review.rating);

        try {
            const res = await crearReview( movie, rating, comment );
            onCreada( res.data);
            setReview({ rating: '', comment: ''});
            setMensaje('Reseña publicada correctamente');
        } catch (error) {
            setError( error.message);
        }
    }

    return (
        <section>
            <h3>Escribí tu reseña</h3>
            <form onSubmit={ handleSubmitReview }>
                <label htmlFor="rating">Puntaje (1 a 5)</label>
                <input type="number" name='rating' value={ review.rating } onChange={ handleChange } required min={1} max={5} />

                <label htmlFor="comment">Comentario</label>
                <textarea name='comment' value={ review.comment } onChange={ handleChange } maxLength={256} />

                <button type='submit'> Publicar reseña</button>
            </form>

            <p>{ mensaje }</p>
            <p>{ error }</p>
        </section>
    )
}

export default FormReview