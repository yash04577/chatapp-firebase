import { useContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import State from './context/State.jsx'
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Register from './pages/Register'
// import 'dotenv/config'

function App() {

  return (
    <State>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </State>
  )
}

export default App
