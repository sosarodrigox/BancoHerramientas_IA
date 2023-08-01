import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function GrupoAsociativo() {
    const navegar = useNavigate();

    const crearGrupo = (representante_grupo_id) => {
        navegar(representante_grupo_id);
    };
    return (
        <div>
            <h3>GRUPO ASOCIATIVO</h3>
            <div className="mb-3">
                <label className="form-label">Listado de Grupos:</label>
                <select className="form-control" name="listadoDeGrupos">
                    {/* Aquí puedes agregar las opciones del listado de grupos */}
                </select>
            </div>
            <button className="btn btn-primary" onClick={crearGrupo}>Crear grupo</button>
        </div>
    );
}