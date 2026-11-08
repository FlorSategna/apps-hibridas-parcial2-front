import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Perfil from './pages/Perfil'
import NotFound from './pages/NotFound'
import Nav from './components/Nav'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'

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
        </Route>

        <Route path='*' element={ <NotFound />} />

      </Routes>
    </>
  )
}

export default App