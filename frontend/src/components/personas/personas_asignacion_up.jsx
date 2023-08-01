import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EmprendimientoIndividual from "./emprendimiento_individual_up";
import GrupoAsociativo from "./grupo_asociativo_up";
import Cooperativa from "./cooperativa_up";

export default function PersonaAsignacionUP() {
    const [persona, setPersona] = useState({});
    const [tipoUnidadProductiva, setTipoUnidadProductiva] = useState("");
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

    // Estados para manejar los valores del rango y del cuadro de texto
    const [rangoAnios, setRangoAnios] = useState(unidadProductiva.antiguedad_emprendimiento_anios);
    const [inputAnios, setInputAnios] = useState(unidadProductiva.antiguedad_emprendimiento_anios);
    const [rangoMeses, setRangoMeses] = useState(unidadProductiva.antiguedad_emprendimiento_meses);
    const [inputMeses, setInputMeses] = useState(unidadProductiva.antiguedad_emprendimiento_meses);

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

    // Función para sincronizar los cambios en el cuadro de texto de años
    const handleAniosInputChange = (event) => {
        const { value } = event.target;
        setInputAnios(value);
        if (value === "") {
            // Si el cuadro de texto está vacío, establecemos el valor a 0
            setRangoAnios(0);
        } else {
            // Convertimos el valor a un número entero y lo actualizamos en el rango
            setRangoAnios(parseInt(value));
        }
    };

    // Función para ajustar el rango si el usuario termina de modificar el cuadro de texto
    const handleAniosInputBlur = () => {
        if (inputAnios === "") {
            // Si el cuadro de texto está vacío, establecemos el valor a 0
            setInputAnios("0");
            setRangoAnios(0);
        } else {
            // Convertimos el valor a un número entero
            const intValue = parseInt(inputAnios);
            // Si el valor está fuera de los límites, ajustamos al límite más cercano
            if (intValue < 0) {
                setInputAnios("0");
                setRangoAnios(0);
            } else if (intValue > 80) {
                setInputAnios("80");
                setRangoAnios(80);
            } else {
                // Si el valor es válido, actualizamos ambos estados
                setInputAnios(String(intValue));
                setRangoAnios(intValue);
            }
        }
    };

    const handleRangoAniosChange = (event) => {
        const { value } = event.target;
        setRangoAnios(value);
        setInputAnios(value);
    };

    // Dentro de la función del componente
    const handleMesesInputChange = (event) => {
        const { value } = event.target;
        setInputMeses(value);
        if (value === "") {
            // Si el cuadro de texto está vacío, establecemos el valor a 0
            setRangoMeses(0);
        } else {
            // Convertimos el valor a un número entero y lo actualizamos en el rango
            setRangoMeses(parseInt(value));
        }
    };

    const handleMesesInputBlur = () => {
        if (inputMeses === "") {
            // Si el cuadro de texto está vacío, establecemos el valor a 0
            setInputMeses("0");
            setRangoMeses(0);
        } else {
            // Convertimos el valor a un número entero
            const intValue = parseInt(inputMeses);
            // Si el valor está fuera de los límites, ajustamos al límite más cercano
            if (intValue < 0) {
                setInputMeses("0");
                setRangoMeses(0);
            } else if (intValue > 12) {
                setInputMeses("12");
                setRangoMeses(12);
            } else {
                // Si el valor es válido, actualizamos ambos estados
                setInputMeses(String(intValue));
                setRangoMeses(intValue);
            }
        }
    };

    const handleRangoMesesChange = (event) => {
        const { value } = event.target;
        setRangoMeses(value);
        setInputMeses(value);
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

            {/* Mostrar el componente correspondiente según el tipo de unidad productiva seleccionado */}
            {tipoUnidadProductiva === "EMPRENDIMIENTO INDIVIDUAL" && (
                <EmprendimientoIndividual persona={persona} />
            )}

            {tipoUnidadProductiva === "GRUPO ASOCIATIVO" && <GrupoAsociativo />}

            {tipoUnidadProductiva === "COOPERATIVA" && <Cooperativa />}

            {/* Mostrar el formulario solo si se ha seleccionado un tipo de unidad productiva */}
            {tipoUnidadProductiva && (
                <div>
                    {/* <div className="mb-3">
                        <label className="form-label">Denominación UP:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="denominacion_up"
                            value={`UP_${persona.apellido}_${persona.cuil}`}
                            readOnly
                        />
                    </div> */}
                    <div className="mb-3">
                        <label className="form-label">
                            Antigüedad del emprendimiento (años):
                            <input
                                type="text"
                                className="form-control"
                                value={inputAnios}
                                onChange={handleAniosInputChange}
                                onBlur={handleAniosInputBlur}
                            />
                        </label>
                        <input
                            type="range"
                            className="form-range"
                            name="antiguedad_emprendimiento_anios"
                            min="0"
                            max="80"
                            value={rangoAnios}
                            onChange={handleRangoAniosChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Antigüedad del emprendimiento (meses):
                            <input
                                type="text"
                                className="form-control"
                                value={inputMeses}
                                onChange={handleMesesInputChange}
                                onBlur={handleMesesInputBlur}
                            />
                        </label>
                        <input
                            type="range"
                            className="form-range"
                            name="antiguedad_emprendimiento_meses"
                            min="0"
                            max="12"
                            value={rangoMeses}
                            onChange={handleRangoMesesChange}
                        />
                    </div>
                    <div className="mb-3">
                        <div class="form-check form-switch">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                name="emprendimiento_formalizado"
                                role="switch"
                                id="flexSwitchCheckChecked"
                                checked={unidadProductiva.emprendimiento_formalizado}
                                onChange={() =>
                                    setUnidadProductiva((prevState) => ({
                                        ...prevState,
                                        emprendimiento_formalizado: !prevState.emprendimiento_formalizado,
                                    }))
                                }
                            />
                            <label class="form-check-label" for="flexSwitchCheckChecked">
                                Emprendimiento formalizado
                            </label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div class="form-check form-switch">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                name="emprendimiento_activo"
                                role="switch"
                                id="flexSwitchCheckChecked"
                                checked={unidadProductiva.emprendimiento_activo}
                                onChange={() =>
                                    setUnidadProductiva((prevState) => ({
                                        ...prevState,
                                        emprendimiento_activo: !prevState.emprendimiento_activo,
                                    }))
                                }
                            />
                            <label class="form-check-label" for="flexSwitchCheckChecked">
                                Emprendimiento activo
                            </label>
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
