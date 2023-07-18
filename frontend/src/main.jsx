import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home'
import UnidadesProductivas from './components/unidades_productivas'
import Personas from './components/personas'
import PersonasLista from './components/personas/personas_lista'
import PersonaForm from './components/personas/persona_form'
import PersonaAsignacionUP from './components/personas/personas_asignacion_up'
import Proyectos from './components/proyectos'
import EmprendedoresLista from './components/up_emprendedores/emprendedores_lista'

import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="Personas" element={<Personas />}>
            <Route path='personas_lista' element={<PersonasLista />}></Route>
            <Route path="personas_lista/:id" element={<PersonaForm />}></Route>
            <Route path="personas_lista/up/:id" element={<PersonaAsignacionUP />}></Route>
          </Route>
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
