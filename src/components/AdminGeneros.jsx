import { useState } from "react"
import { crearGenero, editarGenero, borrarGenero } from "../service/api"

function AdminGeneros({ generos, setGeneros }){

    const [ error, setError ] = useState('');
    const [ mensaje, setMensaje ] = useState('');
    const [ editandoId, setEditandoId ] = useState(null);

    // Estado para el formulario de género
    const [ name, setName ] = useState('');

    function handleEditar(genero){
        setError('');
        setMensaje('');
        setName( genero.name);
        setEditandoId( genero._id);
    }

    function handleCancelar(){
        setName('');
        setEditandoId( null);
        setError('');
    }

    async function handleSubmitGenero(event){
        event.preventDefault();
        setError('');
        setMensaje('');

        try {
            if( editandoId){
                const res = await editarGenero( editandoId, name );
                setGeneros( generos.map( item => item._id === editandoId ? res.data : item));
                setMensaje('Género editado correctamente');
            } else {
                const res = await crearGenero( name );
                setGeneros( [ ...generos, res.data ]);
                setMensaje('Género creado correctamente');
            }

            setName('');
            setEditandoId( null);
        } catch (error) {
            setError( error.message);
        }
    }

    async function handleBorrar(id){
        if( !window.confirm('¿Seguro que querés borrar el género?')){
            return;
        }

        setError('');
        setMensaje('');

        try {
            await borrarGenero( id);
            setGeneros( generos.filter( item => item._id !== id));
            setMensaje('Género borrado correctamente');
        } catch (error) {
            setError( error.message);
        }
    }

    return (
        <section>
            <h2>{ editandoId ? 'Editar género' : 'Agregar género' }</h2>
            <form onSubmit={ handleSubmitGenero }>
                <label htmlFor="name">Nombre</label>
                <input 
                    type="text" 
                    name='name' 
                    value={ name } 
                    onChange={ ( event) => setName( event.target.value) } 
                    required 
                    minLength={3} 
                    maxLength={64} 
                />

                <button type='submit'> { editandoId ? 'Guardar cambios' : 'Agregar género' }</button>

                {
                    editandoId && (
                        <button type='button' onClick={ handleCancelar }> Cancelar</button>
                    )
                }
            </form>

            <p>{ mensaje }</p>
            <p>{ error }</p>

            <h2>Géneros</h2>
            <div className="container">
            {
                generos.map( item => (
                    <div className="card" key={ item._id }>
                        <h4>{ item.name }</h4>
                        <button onClick={ () => handleEditar( item ) }> Editar</button>
                        <button onClick={ () => handleBorrar( item._id ) }> Borrar</button>
                    </div>
                ))
            }
            </div>

        </section>
    )
}

export default AdminGeneros