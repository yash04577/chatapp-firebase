import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import State from '../../store4/client/src/context/State.jsx'
import App from './App.jsx'
import './index.css'
// import 'dotenv/config'

ReactDOM.createRoot(document.getElementById('root')).render(
  

  
    <BrowserRouter>
      <App />
    </BrowserRouter>

)
