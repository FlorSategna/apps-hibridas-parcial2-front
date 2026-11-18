import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Perfil from './pages/Perfil'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'
import AccesoDenegado from './pages/AccesoDenegado'
import PeliculaDetalle from './pages/PeliculaDetalle'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import RoleRoute from './components/RoleRouter'

function App() {

  return (
    <>
      <Nav />

      <main>
        <Routes>
          <Route path='/' element={ <Home />} />
          <Route path='/login' element={ <Login />} />
          <Route path='/register' element={ <Register />} />

          {/* Ruta para usuarios AUTENTICADOS */}
          <Route element={ <ProtectedRoute />}>
            <Route path='/perfil' element={ <Perfil />} />

            {/* Rutas para usuarios AUTORIZADOS  */}
            <Route element={ <RoleRoute rolesPermitidos={ ['admin']} />}>
              <Route path='/admin' element={ <Admin />} />
            </Route>

          </Route>
          <Route path='/acceso-denegado' element={< AccesoDenegado />} />
          <Route path='/peliculas/:id' element={ <PeliculaDetalle />} />
          <Route path='*' element={ <NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App