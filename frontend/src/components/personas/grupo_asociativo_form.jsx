import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

export default function GrupoAsociativoForm() {
    const [grupo, setGrupo] = useState({});
    const params = useParams();
    const navegar = useNavigate();
    const location = useLocation();


    const grupo_init = {
        id: -1,
        nombre_grupo: "",
        representante_grupo_id: params.id,
    }

    //TODO: revisar esto para que funcione con el id de grupo, los params traen el id de la persona!
    // useEffect(() => {
    //     if (params.id < 0) {
    //         setGrupo(grupo_init);
    //     } else {
    //         console.log("id:" + params.id);
    //         getGrupo(params.id);
    //     }

    // }, [params.id]);

    useEffect(() => {
        location.state.persona
        // if (location.state && location.state.persona) {
        //     const { nombre, apellido } = location.state.persona;
        //     // setGrupo({ ...grupo, representante_grupo: `${apellido}, ${nombre}` });
        // }
    }, [location.state]);

    // const getGrupo = async (id) => {
    //     try {
    //         let resultado = await axios.get(`http://localhost:8000/grupos/${id}`);
    //         setGrupo(resultado.data);
    //     } catch (error) {
    //         console.log(error);
    //         setGrupo(grupo_init);
    //     }
    // };

    const handleChange = (e) => {
        setGrupo({ ...grupo, [e.target.name]: e.target.value });
    };

    const grabarCambios = async () => {
        try {
            if (grupo.id == -1) {
                let resultado = await axios.post(`http://localhost:8000/grupos/`, grupo);
                console.log(resultado);
                alert("Grupo cargado con éxito");
            } else {
                // let resultado = await axios.put(`http://localhost:8000/personas/${grupo.id}`, grupo);
                // console.log(resultado);
                // alert("Persona modificado con éxito");
                alert("Entró en el else");
            }
            navegar(-1);
        } catch (error) {
            alert(error.response.data.detail);
        }
    };

    return (
        <div className="text-start col-6 offset-3 border p-3">
            <h4 className="mt-3 text-center">Datos del Grupo</h4>

            <div className="mb-3 col-2">
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
            </div>

            <div className="mb-3 col-2">
                <label htmlFor="edRepresentanteID" className="form-label">
                    ID REPRESENTANTE
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edRepresentanteID"
                    name="representanteID"
                    value={location.state.persona.id}
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
                    value={location.state.persona.apellido + ", " + location.state.persona.nombre}
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
                    name="nombre de grupo"
                    value={grupo.nombre_grupo}
                    onChange={handleChange}
                />
            </div>


            {/* <Formulario_UP
                unidadProductiva={unidadProductiva}
                setUnidadProductiva={setUnidadProductiva} // Pasar setUnidadProductiva
            /> */}


            <div className="mb-3 text-end">
                <button className="btn btn-primary me-1" onClick={grabarCambios}>
                    Aceptar
                </button>
                {/* con el navigate va a la pagina anterior en la lista de paginas que recorrió  */}
                <button className="btn btn-secondary ms-1" onClick={() => navegar(-1)}>
                    Cancelar
                </button>
            </div>
        </div>
    );

}