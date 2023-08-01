import React from "react";

export default function GrupoAsociativo() {
    return (
        <div>
            <h3>GRUPO ASOCIATIVO</h3>
            <div className="mb-3">
                <label className="form-label">Listado de Grupos:</label>
                <select className="form-control" name="listadoDeGrupos">
                    {/* Aquí puedes agregar las opciones del listado de grupos */}
                </select>
            </div>
            <button className="btn btn-primary">CREAR NUEVO GRUPO</button>
        </div>
    );
}