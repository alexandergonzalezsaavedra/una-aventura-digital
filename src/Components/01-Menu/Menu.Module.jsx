import React from 'react'
import { useSelector } from 'react-redux';
import IconoTotto from './icono/icono.Module'
import BtnLogInLogOut from './IngresoUsuario/BtnLogInLogOut.Module'
import { NavLink, Link } from "react-router-dom";
const Menu = () => {
    const { displayName } = useSelector(state => state.dataUsuario)
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link to="/" className="navbar-brand fs-3">
                    <IconoTotto />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse w-100" id="navbarTogglerDemo02">
                    <div className="d-flex justify-content-end w-100">
                        <ul className="navbar-nav">
                            <NavLink to="/cargar-imagenes" className="nav-link">
                                Cargar imagenes
                            </NavLink>

                            <li className="nav-item">
                                <div className="nav-link">
                                    {displayName === "" ? "Ingresa con google" : displayName}
                                </div>
                            </li>
                            <li className="nav-item">
                                <BtnLogInLogOut />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Menu