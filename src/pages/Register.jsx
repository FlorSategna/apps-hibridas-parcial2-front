import { useState } from "react"
import { registrarUsuario } from '../service/api.js'
import { useNavigate } from 'react-router-dom'

function Register(){
    const [ error, setError] = useState('');
    const [ mensaje, setMensaje ] = useState('');

    const navigate = useNavigate();


    // Estados para el formulario de registro
    const [ user, setUser] = useState({
            name: '', 
            email: '', 
            password: '',
            confirmPassword: ''
    });

    async function handleSubmitRegister(event){
        event.preventDefault();

        if( user.password !== user.confirmPassword){
        setError('Las contraseñas no coinciden');
        return;
        }

        try {
            await registrarUsuario(user.name, user.email, user.password);
            setMensaje(`Usuario registrado correctamente`);
            setUser({ name: '', email: '', password: '', confirmPassword: ''});

            navigate('/login');
        } catch (error) {
            setError(error.message);
        }
    }
    function handleChange(event) {
        const { name, value } = event.target;
        setUser( { ...user, [name]: value});
    }

    return(
        <>
            <h1>Page Register</h1>
            <form onSubmit={ handleSubmitRegister }>
                <label htmlFor="name">Nombre</label>
                <input type="text" name='name'    value={ user.name} onChange={ handleChange } required />

                <label htmlFor="email">Email</label>
                <input type="email" name='email'  value={user.email} onChange={ handleChange } required />

                <label htmlFor="password">Contraseña</label>
                <input type="password" name='password' value={user.password} onChange={ handleChange } required minLength={6} />

                <label htmlFor="confirmPassword">Repetir Contraseña</label>
                <input type="password" name='confirmPassword' value={user.confirmPassword} onChange={ handleChange } required />


                <button type='submit'> Registrarme</button>
            </form>

              <p> { mensaje }</p>
              <p>{ error}</p>

        </>
    )
}

export default Register