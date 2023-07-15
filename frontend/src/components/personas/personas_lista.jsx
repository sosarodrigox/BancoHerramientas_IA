import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

export default function PersonasLista() {

    const [personas, setPersonas] = useState([])

    useEffect(() => {
        getPersonas()
    }, [])

    const getPersonas = async () => {
        let resultado = await axios.get('http://localhost:8000/emprendedores')
        setPersonas(resultado.data)
    }

    return (
        <>
            <div className="Container-fluid">
                <h4 className="mt-3 text-center">Nómina de personas</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Apellido</th>
                            <th>Nombre</th>
                            <th>CUIL</th>
                            <th>Género</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Nivel Educativo</th>
                            <th>Título Profesional</th>
                            <th>Situacion Laboral</th>
                            <th>Saberes/Experiencia</th>
                            <th>CFP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            personas.map((persona, idx) => (
                                <tr key={persona.id}>
                                    <td><Link to={"" + persona.id}>
                                        {persona.id}
                                    </Link>
                                    </td>
                                    <td>
                                        {persona.apellido}
                                    </td>
                                    <td>
                                        {persona.nombre}
                                    </td>
                                    <td>
                                        {persona.cuil}
                                    </td>
                                    <td>
                                        {persona.genero}
                                    </td>
                                    <td>
                                        {persona.fecha_nacimiento}
                                    </td>
                                    <td>
                                        {persona.nivel_educativo}
                                    </td>
                                    <td>
                                        {persona.titulo_prof}
                                    </td>
                                    <td>
                                        {persona.situacion_laboral}
                                    </td>
                                    <td>
                                        {persona.saberes_experiencia}
                                    </td>
                                    <td>
                                        {persona.curso_formacion_prof}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <button className="btn btn-primary">Agregar persona</button>
            </div>
        </>)
}