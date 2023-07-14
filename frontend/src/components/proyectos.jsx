import React from "react";
import { NavLink } from "react-router-dom";

export default function Proyectos() {
    return (
        <>
            <ul className="nav">
                <li className="nav-item"><NavLink to='proyectos' className='nav-link'>Proyectos</NavLink></li>
            </ul>
        </>
    )
}