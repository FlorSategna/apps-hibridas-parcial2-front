const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerPeliculas(){
    const response = await fetch(`${API_URL}/api/peliculas`);

    if( !response.ok){
        throw new Error("No se pudo obtener las películas");
    }

    return response.json();
}

export async function obtenerPelicula(id){
    const response = await fetch(`${API_URL}/api/peliculas/${id}`);

    if( !response.ok){
        throw new Error("No se pudo obtener la película");
    }

    return response.json();
}

export async function obtenerGeneros(){
    const response = await fetch(`${API_URL}/api/generos`);

    if( !response.ok){
        throw new Error("No se pudo obtener los géneros");
    }

    return response.json();
}

export async function obtenerReviews(){
    const response = await fetch(`${API_URL}/api/reviews`);

    if( !response.ok){
        throw new Error("No se pudo obtener las reseñas");
    }

    return response.json();
}

export async function iniciarSesion(email, password){
    const response = await fetch(`${API_URL}/api/auth/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                }
            );
    const data = await response.json().catch( err => { 
        //console.log(err)
    })
    // console.log( {data});
    if( !response.ok){
        throw new Error("No se pudo iniciar Sesión");
    }

    return data;
}

export async function registrarUsuario(name, email, password){
    const response = await fetch(`${API_URL}/api/auth/register`,  {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password})
                });
    const data = await response.json()

    if( !response.ok){
        throw new Error("No se pudo realizar el registro");

    }
    return data;
}

export async function fetchPrivado( endpoint, options={} ){
    const token = sessionStorage.getItem('token');
    if( !token){
        throw new Error("No existe una sesión activa");
    }

    const headers = new Headers( options.headers || {}  )
    headers.set('Authorization', `Bearer ${token}`);

    const response = await fetch(`${API_URL}${endpoint}`,
                                {
                                    ...options, headers
                                }
                            );
    const data = await response.json().catch( () => null );
    
    if( response.status === 401){
        throw new Error("La sesión es invalida o expiro");
    }

    if( response.status === 403) {
        throw new Error("Acceso no Permido");
    }

    if( !response.ok){
        console.log(data.message)
        throw new Error( data?.message || "Error del Servidor");
    }

    return data;
}

export async function crearPelicula(title, year, genre, description){
    const data = await fetchPrivado('/api/peliculas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title, year, genre, description })
                });

    if( !data){
        throw new Error("No se pudo crear la película");
    }

    return data;
}

export async function editarPelicula(id, title, year, genre, description){
    const data = await fetchPrivado(`/api/peliculas/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title, year, genre, description })
                });

    if( !data){
        throw new Error("No se pudo editar la película");
    }

    return data;
}

export async function borrarPelicula(id){
    const data = await fetchPrivado(`/api/peliculas/${id}`, {
                    method: 'DELETE'
                });

    if( !data){
        throw new Error("No se pudo borrar la película");
    }

    return data;
}

export async function crearGenero(name){
    const data = await fetchPrivado('/api/generos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name })
                });

    if( !data){
        throw new Error("No se pudo crear el género");
    }

    return data;
}

export async function editarGenero(id, name){
    const data = await fetchPrivado(`/api/generos/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name })
                });

    if( !data){
        throw new Error("No se pudo editar el género");
    }

    return data;
}

export async function borrarGenero(id){
    const data = await fetchPrivado(`/api/generos/${id}`, {
                    method: 'DELETE'
                });

    if( !data){
        throw new Error("No se pudo borrar el género");
    }

    return data;
}

export async function editarReview(id, movie, rating, comment){
    const data = await fetchPrivado(`/api/reviews/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ movie, rating, comment })
                });

    if( !data){
        throw new Error("No se pudo editar la reseña");
    }

    return data;
}

export async function borrarReview(id){
    const data = await fetchPrivado(`/api/reviews/${id}`, {
                    method: 'DELETE'
                });

    if( !data){
        throw new Error("No se pudo borrar la reseña");
    }

    return data;
}