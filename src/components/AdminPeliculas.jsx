import { useState, useEffect } from "react"
import { obtenerPeliculas, obtenerPelicula, crearPelicula, editarPelicula, borrarPelicula } from "../service/api"

function AdminPeliculas({ generos }){

    const [ peliculas, setPeliculas ] = useState([]);
    const [ error, setError ] = useState('');
    const [ mensaje, setMensaje ] = useState('');
    const [ editandoId, setEditandoId ] = useState(null);

    // Estados para el formulario de película
    const [ pelicula, setPelicula ] = useState({
        title: '',
        year: '',
        genre: '',
        description: ''
    });

    useEffect(  () => {
        async function getPeliculas() {
            try {
                const res = await obtenerPeliculas();
                setPeliculas( res.data);
            } catch (error) {
                console.error(error);
                setError('No pudimos obtener las películas');
            }
        }

        getPeliculas();
    }, [] )

    function handleChange(event) {
        const { name, value } = event.target;
        setPelicula( { ...pelicula, [name]: value});
    }

    async function handleEditar(id){
        setError('');
        setMensaje('');

        try {
            const res = await obtenerPelicula( id);
            const { title, year, description } = res.data;
            const genre = res.data.genre?._id || '';

            setPelicula({ title, year, genre, description });
            setEditandoId( id);
        } catch (error) {
            setError( error.message);
        }
    }

    function handleCancelar(){
        setPelicula({ title: '', year: '', genre: '', description: ''});
        setEditandoId( null);
        setError('');
    }

    async function handleSubmitPelicula(event){
        event.preventDefault();
        setError('');
        setMensaje('');

        const { title, genre, description } = pelicula;
        const year = Number( pelicula.year);

        try {
            if( editandoId){
                const res = await editarPelicula( editandoId, title, year, genre, description );
                setPeliculas( peliculas.map( item => item._id === editandoId ? res.data : item));
                setMensaje('Película editada correctamente');
            } else {
                const res = await crearPelicula( title, year, genre, description );
                setPeliculas( [ ...peliculas, res.data ]);
                setMensaje('Película creada correctamente');
            }

            setPelicula({ title: '', year: '', genre: '', description: ''});
            setEditandoId( null);
        } catch (error) {
            setError( error.message);
        }
    }

    async function handleBorrar(id){
        if( !window.confirm('¿Seguro que querés borrar la película?')){
            return;
        }

        setError('');
        setMensaje('');

        try {
            await borrarPelicula( id);
            setPeliculas( peliculas.filter( item => item._id !== id));
            setMensaje('Película borrada correctamente');
        } catch (error) {
            setError( error.message);
        }
    }

    return (
        <section>
            <h2>{ editandoId ? 'Editar película' : 'Agregar película' }</h2>
            <form onSubmit={ handleSubmitPelicula }>
                <label htmlFor="title">Título</label>
                <input type="text" name='title' value={ pelicula.title } onChange={ handleChange } required minLength={3} maxLength={128} />

                <label htmlFor="year">Año</label>
                <input type="number" name='year' value={ pelicula.year } onChange={ handleChange } required min={1900} />

                <label htmlFor="genre">Género</label>
                <select name='genre' value={ pelicula.genre } onChange={ handleChange } required>
                    <option value=''>Elegí un género</option>
                    {
                        generos.map( genero => (
                            <option key={ genero._id } value={ genero._id }>{ genero.name }</option>
                        ))
                    }
                </select>

                <label htmlFor="description">Descripción</label>
                <textarea name='description' value={ pelicula.description } onChange={ handleChange } maxLength={512} />

                <button type='submit'> { editandoId ? 'Guardar cambios' : 'Agregar película' }</button>

                {
                    editandoId && (
                        <button type='button' onClick={ handleCancelar }> Cancelar</button>
                    )
                }
            </form>

            <p>{ mensaje }</p>
            <p>{ error }</p>

            <h2>Películas</h2>
            <div className="container">
            {
                peliculas.map( item => (
                    <div className="card" key={ item._id }>
                        <h4>{ item.title } ({ item.year })</h4>
                        <p>{ generos.find( genero => genero._id === item.genre )?.name }</p>
                        <button onClick={ () => handleEditar( item._id ) }> Editar</button>
                        <button onClick={ () => handleBorrar( item._id ) }> Borrar</button>
                    </div>
                ))
            }
            </div>

        </section>
    )
}

export default AdminPeliculas