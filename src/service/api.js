const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerPeliculas(){
    const response = await fetch(`${API_URL}/api/peliculas`);

    if( !response.ok){
        throw new Error("No se pudo obtener las películas");
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