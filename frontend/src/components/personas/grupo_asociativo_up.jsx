import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function GrupoAsociativo({ setGrupoAsociativoCreado }) {
    const [grupos, setGrupos] = useState([]);
    const [grupoSeleccionado, setGrupoSeleccionado] = useState({});

    useEffect(() => {
        getGrupos();
    }, []);

    const crearGrupo = (representante_grupo_id) => {

        setGrupoAsociativoCreado(true);
    };

    const getGrupos = async () => {
        try {
            let resultado = await axios.get(`http://localhost:8000/grupos/`);
            setGrupos(resultado.data);
        } catch (error) {
            setGrupos([]);
            console.error(error);
            alert(error.response.data.detail);
        }
    };

    const handleChange = (e) => {
        /* Guardar el dato de id curso */
        setGrupoSeleccionado({
            ...grupoSeleccionado,
            id: parseInt(e.target.value), // Convertir a entero
        });
    };

    return (
        <div>
            <h3>GRUPO ASOCIATIVO</h3>
            <div className="mb-3">
                <label className="form-label">Listado de Grupos:</label>
                <select className="form-control"
                    id="listadoDeGrupos"
                    name="listadoDeGrupos"
                    value={grupoSeleccionado.nombre_grupo}
                    onChange={handleChange}
                >
                    <option value="-1">Seleccione un grupo</option>
                    {grupos.map((grupo) => (
                        <option key={grupo.id} value={grupo.id}>
                            {grupo.nombre_grupo}
                        </option>
                    ))}
                </select>
            </div>
            <button className="btn btn-primary" onClick={crearGrupo}>CREAR GRUPO</button>
        </div>
    );
}