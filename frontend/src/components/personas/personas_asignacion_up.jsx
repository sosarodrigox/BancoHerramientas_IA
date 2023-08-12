import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EmprendimientoIndividual from "./emprendimiento_individual_up";
import GrupoAsociativo from "./grupo_asociativo_up";
import Cooperativa from "./cooperativa_up";
import Formulario_UP from "./formulario_up";

export default function PersonaAsignacionUP() {
    const [persona, setPersona] = useState({});
    const [tipoUnidadProductiva, setTipoUnidadProductiva] = useState("");
    // const [grupoAsociativoCreado, setGrupoAsociativoCreado] = useState(false);


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

    const grabarCambios = async () => {
        // Verifica si el tipo de unidad productiva está seleccionado
        if (!tipoUnidadProductiva) {
            alert("Debe seleccionar un tipo de unidad productiva");
            return;
        }

        if (persona.rol !== "no asignado") {
            alert("La persona ya tiene asignada una unidad productiva");
            return;
        } else {
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
                    unidadProductiva.persona_id = persona.id;
                    await axios.post("http://localhost:8000/up", unidadProductiva);

                    // Asigna a la persona el rol de emprendedor
                    persona.rol = "emprendedor"
                    let resultado = await axios.put(`http://localhost:8000/personas/${persona.id}`, persona);
                    console.log(resultado);
                } else {
                    // Realiza la solicitud para crear o actualizar la unidad productiva
                    await axios.post("http://localhost:8000/up", unidadProductiva);
                }

                alert(`La Persona: ${persona.apellido}, ${persona.nombre} a sido asignada exitosamente a la Unidad Productiva tipo: ${persona.rol} con el nombre de UP: UP_${persona.apellido}_${persona.cuil}.`);
                navegar(-1);
            } catch (error) {
                console(error.response.data.detail);
            }
        }
    };

    return (
        <div className="text-start col-6 offset-3 border p-3">
            <h1 className="mt-3 text-center">Asignar Unidad Productiva:</h1>
            <h3 className="mt-3 text-center">
                {persona.apellido}, {persona.nombre} - {persona.cuil}
            </h3>
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

            {/* Mostrar el componente correspondiente según el tipo de unidad productiva seleccionado */}
            {tipoUnidadProductiva === "EMPRENDIMIENTO INDIVIDUAL" && (
                <EmprendimientoIndividual persona={persona} />
            )}

            {tipoUnidadProductiva === "GRUPO ASOCIATIVO" && (
                <GrupoAsociativo
                    // setGrupoAsociativoCreado={setGrupoAsociativoCreado}
                    persona={persona} // Pasar la variable persona al componente hijo

                    unidadProductiva={unidadProductiva} // Pasar unidadProductiva
                    setUnidadProductiva={setUnidadProductiva} // Pasar setUnidadProductiva

                />
            )}

            {tipoUnidadProductiva === "COOPERATIVA" && <Cooperativa />}

            {/* Mostrar el formulario solo si se ha seleccionado un tipo de unidad productiva */}
            {tipoUnidadProductiva &&
                (tipoUnidadProductiva === "EMPRENDIMIENTO INDIVIDUAL") && (
                    <Formulario_UP
                        unidadProductiva={unidadProductiva}
                        setUnidadProductiva={setUnidadProductiva} // Pasar setUnidadProductiva
                    />
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
