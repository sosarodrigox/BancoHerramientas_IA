import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home'
import UnidadesProductivas from './components/unidades_productivas'
import Proyectos from './components/proyectos'
import EmprendedoresLista from './components/up_emprendedores/emprendedores_lista'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="up" element={<UnidadesProductivas />}>
            <Route path='emprendedores' element={<EmprendedoresLista />}></Route>
          </Route>
          <Route path='proyectos' element={<Proyectos />}>

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
