import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PersonaAsignacionUP() {
    const [persona, setPersona] = useState({});
    const [tipoUnidadProductiva, setTipoUnidadProductiva] = useState("");
    const [unidadProductiva, setUnidadProductiva] = useState({
        denominacion_up: "",
        antiguedad_emprendimiento_meses: 0,
        antiguedad_emprendimiento_anios: 0,
        emprendimiento_formalizado: false,
        emprendimiento_activo: true,
        comercializacion_descripcion: "",
        servicios_productos: "",
        cantidad_integrantes: 0,
    });

    const params = useParams();
    const navegar = useNavigate();

    useEffect(() => {
        getPersona(params.id);
    }, [params.id]);

    const getPersona = async (id) => {
        try {
            let resultado = await axios.get(`http://localhost:8000/personas/${id}`);
            setPersona(resultado.data);
        } catch (error) {
            console.log(error);
            setPersona({});
        }
    };

    const handleChange = (event) => {
        setTipoUnidadProductiva(event.target.value);
        // TODO: Habilitar solo si se selecciona emprendimiento individual

        // Realiza cualquier acción adicional según el tipo de unidad productiva seleccionado

    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setUnidadProductiva((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const grabarCambios = async () => {
        // Verifica si el tipo de unidad productiva está seleccionado
        if (!tipoUnidadProductiva) {
            alert("Debe seleccionar un tipo de unidad productiva");
            return;
        }

        // Agrega el tipo de unidad productiva al objeto unidad productiva
        unidadProductiva.persona_id = persona.id;

        try {
            if (tipoUnidadProductiva === "EMPRENDIMIENTO INDIVIDUAL") {
                // Crea el emprendedor asignado a la persona
                await axios.post("http://localhost:8000/emprendedores", {
                    persona_id: persona.id,
                });

                // Asigna la persona a la unidad productiva
                unidadProductiva.denominacion_up = `UP_${persona.apellido}_${persona.cuil}`;
                await axios.post("http://localhost:8000/up", unidadProductiva);
            } else {
                // Realiza la solicitud para crear o actualizar la unidad productiva
                await axios.post("http://localhost:8000/up", unidadProductiva);
            }

            alert("Unidad productiva asignada con éxito");
            navegar(-1);
        } catch (error) {
            alert(error.response.data.detail);
        }
    };


    return (
        <div className="text-start col-6 offset-3 border p-3">
            <h1 className="mt-3 text-center">Asignar Unidad Productiva:</h1>
            <h2 className="mt-3 text-center">
                {persona.apellido}, {persona.nombre} - {persona.cuil}
            </h2>
            <div className="mb-3 col-2-center">
                <select
                    className="form-control"
                    id="edTipoUP"
                    name="edTipoUP"
                    value={tipoUnidadProductiva}
                    onChange={handleChange}
                >
                    <option value="">Seleccione un tipo de unidad productiva</option>
                    <option value="EMPRENDIMIENTO INDIVIDUAL">EMPRENDIMIENTO INDIVIDUAL</option>
                    <option value="GRUPO ASOCIATIVO">GRUPO ASOCIATIVO</option>
                    <option value="COOPERATIVA">COOPERATIVA</option>
                </select>
            </div>

            {/* Mostrar el formulario solo si se ha seleccionado un tipo de unidad productiva */}
            {tipoUnidadProductiva && (
                <div>
                    <div className="mb-3">
                        <label className="form-label">Denominación UP:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="denominacion_up"
                            value={`UP_${persona.apellido}_${persona.cuil}`}
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Antigüedad del emprendimiento (años):</label>
                        <input
                            type="number"
                            className="form-control"
                            name="antiguedad_emprendimiento_anios"
                            value={unidadProductiva.antiguedad_emprendimiento_anios}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Antigüedad del emprendimiento (meses):</label>
                        <input
                            type="number"
                            className="form-control"
                            name="antiguedad_emprendimiento_meses"
                            value={unidadProductiva.antiguedad_emprendimiento_meses}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="mb-3">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="emprendimiento_formalizado"
                                checked={unidadProductiva.emprendimiento_formalizado}
                                onChange={() =>
                                    setUnidadProductiva((prevState) => ({
                                        ...prevState,
                                        emprendimiento_formalizado: !prevState.emprendimiento_formalizado,
                                    }))
                                }
                            />
                            <label className="form-check-label">Emprendimiento formalizado</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="emprendimiento_activo"
                                checked={unidadProductiva.emprendimiento_activo}
                                onChange={() =>
                                    setUnidadProductiva((prevState) => ({
                                        ...prevState,
                                        emprendimiento_activo: !prevState.emprendimiento_activo,
                                    }))
                                }
                            />
                            <label className="form-check-label">Emprendimiento activo</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Descripción de comercialización:</label>
                        <textarea
                            className="form-control"
                            name="comercializacion_descripcion"
                            rows={5}
                            maxLength={1024}
                            value={unidadProductiva.comercializacion_descripcion}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Servicios/Productos:</label>
                        <textarea
                            className="form-control"
                            name="servicios_productos"
                            rows={5}
                            maxLength={1024}
                            value={unidadProductiva.servicios_productos}
                            onChange={handleFormChange}
                        />
                    </div>
                </div>
            )}

            <div className="mb-3 text-end">
                <button className="btn btn-primary me-1" onClick={grabarCambios}>
                    Aceptar
                </button>
                <button className="btn btn-secondary ms-1" onClick={() => navegar(-1)}>
                    Cancelar
                </button>
            </div>
        </div>
    );
}
