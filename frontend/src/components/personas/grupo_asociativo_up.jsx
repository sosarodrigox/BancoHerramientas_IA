import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function GrupoAsociativo({ setGrupoAsociativoCreado, persona }) {
    const [grupos, setGrupos] = useState([]);
    const [grupoSeleccionado, setGrupoSeleccionado] = useState({});
    const [asignarHabilitado, setAsignarHabilitado] = useState(false); // Nuevo estado
    const navegar = useNavigate();

    useEffect(() => {
        getGrupos();
    }, []);

    useEffect(() => {
        // Verifica si hay un grupo seleccionado para habilitar el botón "ASIGNAR A GRUPO"
        setAsignarHabilitado(!!grupoSeleccionado.id);
    }, [grupoSeleccionado]);

    const crearGrupo = (representante_grupo_id) => {
        setGrupoAsociativoCreado(true);
    };

    const asignarGrupo = async () => {
        try {
            if (persona.rol !== "no asignado") {
                alert("La persona ya tiene un rol asignado");
            } else {
                if (grupoSeleccionado.id === -1) {
                    alert("Debe seleccionar un grupo");
                }
                let nuevoIntegrante = {
                    "id_grupo": grupoSeleccionado.id,
                    "id_nuevo_integrante": persona.id,
                }
                axios.post(`http://localhost:8000/grupos/nuevo`, nuevoIntegrante);

                alert(`Mensaje: ${persona.apellido}, ${persona.nombre} a sido asignado/a como integrante del grupo: ${grupoSeleccionado.nombre_grupo}`);
                navegar(-1);
            }
        } catch (error) {
            alert(error.response.data.detail);
        }
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

        if (e.target.value == -1) {
            setGrupoSeleccionado({});
        }
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
            <div className="d-flex justify-content-between"> {/* Contenedor para botones */}
                <button className="btn btn-primary" onClick={crearGrupo}>CREAR GRUPO</button>
                <button className="btn btn-primary" onClick={asignarGrupo} disabled={!asignarHabilitado}>
                    ASIGNAR A GRUPO
                </button>
            </div>
        </div>
    );
}