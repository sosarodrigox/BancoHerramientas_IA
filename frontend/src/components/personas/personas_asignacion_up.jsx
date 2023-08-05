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
    const [grupoAsociativoCreado, setGrupoAsociativoCreado] = useState(false);


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

            {tipoUnidadProductiva === "GRUPO ASOCIATIVO" && (
                <GrupoAsociativo
                    setGrupoAsociativoCreado={setGrupoAsociativoCreado}
                    persona={persona} // Pasar la variable persona al componente hijo
                />
            )}

            {tipoUnidadProductiva === "COOPERATIVA" && <Cooperativa />}

            {/* Mostrar el formulario solo si se ha seleccionado un tipo de unidad productiva */}
            {tipoUnidadProductiva &&
                (tipoUnidadProductiva === "EMPRENDIMIENTO INDIVIDUAL" ||
                    (tipoUnidadProductiva === "GRUPO ASOCIATIVO" && grupoAsociativoCreado)) && (
                    <Formulario_UP
                        inputAnios={inputAnios}
                        handleAniosInputChange={handleAniosInputChange}
                        handleAniosInputBlur={handleAniosInputBlur}
                        rangoAnios={rangoAnios}
                        handleRangoAniosChange={handleRangoAniosChange}
                        inputMeses={inputMeses}
                        handleMesesInputChange={handleMesesInputChange}
                        handleMesesInputBlur={handleMesesInputBlur}
                        rangoMeses={rangoMeses}
                        handleRangoMesesChange={handleRangoMesesChange}
                        unidadProductiva={unidadProductiva}
                        handleFormChange={handleFormChange}
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
