import { useState, useEffect } from "react"
import { obtenerPeliculas, obtenerPelicula, crearPelicula, editarPelicula, borrarPelicula, subirImagenPelicula } from "../service/api"

const API_URL = import.meta.env.VITE_API_URL;

function AdminPeliculas({ generos }){

    const [ peliculas, setPeliculas ] = useState([]);
    const [ error, setError ] = useState('');
    const [ mensaje, setMensaje ] = useState('');
    const [ editandoId, setEditandoId ] = useState(null);
    const [ archivo, setArchivo ] = useState(null);
    const [ imagenActual, setImagenActual ] = useState(null);

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

    function seleccionarImagen( evento){
        const file = evento.target.files[0];
        if( !file){
            setArchivo( null);
            return;
        }
        if( !['image/jpeg', 'image/png', 'image/webp'].includes( file.type ) ){
            setError('Formato no valido, usá jpg, png o webp');
            evento.target.value = '';
            setArchivo( null);
            return;
        }
        if( file.size > 2 * 1024 * 1024){
            setError('La imagen no puede superar los 2MB');
            evento.target.value = '';
            setArchivo( null);
            return;
        }

        setArchivo( file );
        setError('');
    }

    async function handleEditar(id){
        setError('');
        setMensaje('');

        try {
            const res = await obtenerPelicula( id);
            const { title, year, description } = res.data;
            const genre = res.data.genre?._id || '';

            setPelicula({ title, year, genre, description });
            setImagenActual( res.data.image);
            setArchivo( null);
            setEditandoId( id);
        } catch (error) {
            setError( error.message);
        }
    }

    function handleCancelar(){
        setPelicula({ title: '', year: '', genre: '', description: ''});
        setImagenActual( null);
        setArchivo( null);
        setEditandoId( null);
        setError('');
    }

    async function handleSubmitPelicula(event){
        event.preventDefault();
        setError('');
        setMensaje('');

        const formulario = event.target;
        const { title, genre, description } = pelicula;
        const year = Number( pelicula.year);

        try {
            let guardada;
            let lista;

            if( editandoId){
                const res = await editarPelicula( editandoId, title, year, genre, description );
                guardada = res.data;
                lista = peliculas.map( item => item._id === editandoId ? guardada : item);
                setMensaje('Película editada correctamente');
            } else {
                const res = await crearPelicula( title, year, genre, description );
                guardada = res.data;
                lista = [ ...peliculas, guardada ];
                setMensaje('Película creada correctamente');
            }
            setPeliculas( lista);

            formulario.reset();
            setPelicula({ title: '', year: '', genre: '', description: ''});
            setImagenActual( null);
            setArchivo( null);
            setEditandoId( null);

            if( archivo){
                const resImagen = await subirImagenPelicula( guardada._id, archivo );
                setPeliculas( lista.map( item => item._id === guardada._id ? resImagen.data : item));
            }
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

                <label htmlFor="image">Imagen (jpg, png o webp, hasta 2 MB)</label>
                {
                    imagenActual && (
                        <img className="miniatura" src={ `${API_URL}${imagenActual}` } alt="Imagen actual" />
                    )
                }
                <input 
                    key={ editandoId || 'nuevo' }
                    type="file" 
                    name='image'
                    accept="image/jpeg,image/png,image/webp"
                    onChange={ seleccionarImagen }
                />

                <button type='submit'> { editandoId ? 'Guardar cambios' : 'Agregar película' }</button>

                {
                    editandoId && (
                        <button type='button' className="btn-secondary" onClick={ handleCancelar }> Cancelar</button>
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
                        {
                            item.image ? (
                                <img src={ `${API_URL}${item.image}` } alt={ item.title } />
                            ) : (
                                <div className="sin-imagen">Sin imagen</div>
                            )
                        }
                        <h4>{ item.title } ({ item.year })</h4>
                        <p>{ generos.find( genero => genero._id === item.genre )?.name }</p>
                        <button className="btn-secondary" onClick={ () => handleEditar( item._id ) }> Editar</button>
                        <button onClick={ () => handleBorrar( item._id ) }> Borrar</button>
                    </div>
                ))
            }
            </div>

        </section>
    )
}

export default AdminPeliculas