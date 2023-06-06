import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import State from '../../store4/client/src/context/State.jsx'
import App from './App.jsx'
import './index.css'
// import 'dotenv/config'

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  

  
    <BrowserRouter>
        <ToastContainer />
        <App />
      
    </BrowserRouter>

)
