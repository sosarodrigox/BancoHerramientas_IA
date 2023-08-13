import React, { useState } from "react";
import Formulario_UP from "./formulario_up";

export default function GrupoAsociativoForm({ persona, setNombreGrupo }) {
    const [grupo, setGrupo] = useState({});
    const [unidadProductiva, setUnidadProductiva] = useState({
        persona_id: 0,
        denominacion_up: "",
        antiguedad_emprendimiento_meses: 0,
        antiguedad_emprendimiento_anios: 0,
        emprendimiento_formalizado: false,
        emprendimiento_activo: true,
        comercializacion_descripcion: "",
        servicios_productos: "",
        cantidad_integrantes: 0,
    });

    // const grupo_init = {
    //     id: -1,
    //     nombre_grupo: "",
    //     representante_grupo_id: persona.id,
    // }

    // const handleChange = (e) => {
    //     setGrupo({ ...grupo, [e.target.name]: e.target.value });
    // };

    const handleChange = (e) => {
        setGrupo({ ...grupo, [e.target.name]: e.target.value });
        if (e.target.name === "nombre_grupo") {
            setNombreGrupo(e.target.value);
        }
    };

    return (
        <div className="text-start ">
            <h4 className="mt-3 text-center">Datos del Grupo</h4>

            {/* <div className="mb-3 col-2">
                <label htmlFor="edId" className="form-label">
                    ID GRUPO
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edId"
                    name="id"
                    value={grupo.id}
                    onChange={handleChange}
                    disabled
                />
            </div> */}

            <div className="mb-3 col-2">
                <label htmlFor="edRepresentanteID" className="form-label">
                    ID REPRESENTANTE
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edRepresentanteID"
                    name="representanteID"
                    value={persona.id}
                    onChange={handleChange}
                    disabled
                />
            </div>

            <div className="mb-3 col-2">
                <label htmlFor="edRepresentante" className="form-label">
                    Representante del grupo
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edRepresentante"
                    name="representante"
                    value={persona.apellido + ", " + persona.nombre}
                    onChange={handleChange}
                    disabled
                />
            </div>

            <div className="mb-3 col-2">
                <label htmlFor="edNombreGrupo" className="form-label">
                    Nombre de grupo
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edNombreGrupo"
                    name="nombre_grupo"
                    value={grupo.nombre_grupo}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Denominación UP:</label>
                <input
                    type="text"
                    className="form-control"
                    name="denominacion_up"
                    value={`UP_${grupo.nombre_grupo}_${persona.cuil}`}
                    disabled
                />
            </div>
            <Formulario_UP
                unidadProductiva={unidadProductiva}
                setUnidadProductiva={setUnidadProductiva}
            />
        </div>
    );
}