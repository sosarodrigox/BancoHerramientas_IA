import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home'
import UnidadesProductivas from './components/unidades_productivas'
import Personas from './components/personas'
import PersonasLista from './components/personas/personas_lista'
import PersonaForm from './components/personas/persona_form'
import PersonaAsignacionUP from './components/personas/personas_asignacion_up'
import GrupoAsociativoForm from './components/personas/grupo_asociativo_form'
import Proyectos from './components/proyectos'
import ProyectosLista from './components/proyectos/proyectos_lista'
import ProyectoForm from './components/proyectos/proyecto_form'
import EmprendedoresLista from './components/up_emprendedores/emprendedores_lista'
import GruposLista from './components/up_grupos/grupos_lista'
import CooperativasLista from './components/up_cooperativas/cooperativas_lista'
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
            <Route path="personas_lista/up/:id/:id_grupo" element={<GrupoAsociativoForm />}></Route>
          </Route>
          <Route path="up" element={<UnidadesProductivas />}>
            <Route path='emprendedores' element={<EmprendedoresLista />}></Route>
            <Route path='grupos' element={<GruposLista />}></Route>
            <Route path='cooperativas' element={<CooperativasLista />}></Route>
          </Route>
          <Route path='proyectos' element={<Proyectos />}>
            <Route path='proyectos_lista' element={<ProyectosLista />}></Route>
            <Route path="proyectos_lista/:id" element={<ProyectoForm />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
