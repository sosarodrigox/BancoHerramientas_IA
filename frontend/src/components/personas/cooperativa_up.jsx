import React from "react";

export default function Cooperativa() {
    return (
        <div>
            <h3>COOPERATIVA</h3>
            <div className="mb-3">
                <label className="form-label">Listado de Cooperativas:</label>
                <select className="form-control" name="listadoDeCooperativas">
                    {/* Aquí puedes agregar las opciones del listado de cooperativas */}
                </select>
            </div>
            <button className="btn btn-primary">CREAR COOPERATIVA</button>
        </div>
    );
}