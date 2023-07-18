import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PersonaAsignacionUP() {
    const [persona, setPersona] = useState({});
    const [tipoUnidadProductiva, setTipoUnidadProductiva] = useState("");

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
        // Realiza cualquier acción adicional según el tipo de unidad productiva seleccionado
    };

    const grabarCambios = async () => {
        if (!inscripcion.id_curso) {
            alert("Debe seleccionar un curso");
            return;
        }

        try {
            const fecha_actual = new Date().toISOString().split("T")[0];

            const datos = {
                id_alumno: alumno.id,
                id_curso: inscripcion.id_curso,
                fecha: fecha_actual,
            };

            let resultado = await axios.post(
                `http://localhost:8000/inscripciones`,
                datos
            );

            console.log(resultado);
            alert("Inscripción cargada con éxito");
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
