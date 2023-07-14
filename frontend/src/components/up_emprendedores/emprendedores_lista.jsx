import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

export default function EmprendedoresLista() {

    const [emprendedores, setEmprendedores] = useState([])

    useEffect(() => {
        getEmprendedores()
    }, [])


    const getEmprendedores = async () => {
        let resultado = await axios.get('http://localhost:8000/emprendedores')
        setEmprendedores(resultado.data)
    }



    return (
        <>
            <div className="Container-fluid">
                <h4 className="mt-3 tect-center">Emprendedores individuales</h4>
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
                            emprendedores.map((emprendedor, idx) => (
                                <tr key={emprendedor.id}>
                                    <td><Link to={"" + emprendedor.id}>
                                        {emprendedor.id}
                                    </Link>
                                    </td>
                                    <td>
                                        {emprendedor.apellido}
                                    </td>
                                    <td>
                                        {emprendedor.nombre}
                                    </td>
                                    <td>
                                        {emprendedor.cuil}
                                    </td>
                                    <td>
                                        {emprendedor.genero}
                                    </td>
                                    <td>
                                        {emprendedor.fecha_nacimiento}
                                    </td>
                                    <td>
                                        {emprendedor.nivel_educativo}
                                    </td>
                                    <td>
                                        {emprendedor.titulo_prof}
                                    </td>
                                    <td>
                                        {emprendedor.situacion_laboral}
                                    </td>
                                    <td>
                                        {emprendedor.saberes_experiencia}
                                    </td>
                                    <td>
                                        {emprendedor.curso_formacion_prof}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <button className="btn btn-primary">Agregar emprendedor</button>

            </div>
        </>)
}