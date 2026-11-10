import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Perfil from './pages/Perfil'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'
import AccesoDenegado from './pages/AccesoDenegado'
import Nav from './components/Nav'
import ProtectedRoute from './components/ProtectedRoute'
import RoleRoute from './components/RoleRouter'

function App() {

  return (
    <>
      <h1> Frontend</h1>

      <Nav />

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
        <Route path='*' element={ <NotFound />} />
      </Routes>
    </>
  )
}

export default App