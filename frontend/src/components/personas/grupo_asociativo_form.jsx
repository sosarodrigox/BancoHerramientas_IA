import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function GrupoAsociativoForm({ persona }) {
    const [datos, setDatos] = useState({});
    const params = useParams();
    const navegar = useNavigate();


    const grupo = {
        id: -1,
        nombre_grupo: "",
        representante_grupo_id: persona.id,
    }

    useEffect(() => {
        if (params.id < 0) {
            setDatos(grupo);
        } else {
            getGrupo(params.id);
        }

    }, [params.id]);

    const getGrupo = async (id) => {
        try {
            let resultado = await axios.get(`http://localhost:8000/grupos/${id}`);
            setDatos(resultado.data);
        } catch (error) {
            console.log(error);
            setDatos(grupo);
        }
    };

    const handleChange = (e) => {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    };

    const grabarCambios = async () => {
        try {
            if (datos.id == -1) {
                let resultado = await axios.post(`http://localhost:8000/grupos/`, datos);
                console.log(resultado);
                alert("Grupo cargado con éxito");
            } else {
                // let resultado = await axios.put(`http://localhost:8000/personas/${datos.id}`, datos);
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
            <h2 className="mt-3 text-center">Datos del grupo</h2>
            <div className="mb-3 col-2">
                <label htmlFor="edId" className="form-label">
                    ID
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edId"
                    name="id"
                    value={datos.id}
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
                    value={datos.nombre_grupo}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3 col-2">
                <label htmlFor="edRepresentante" className="form-label">
                    Representante del grupo ID
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edRepresentante"
                    name="representante"
                    value={datos.representante_grupo_id}
                    onChange={handleChange}
                />
            </div>

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