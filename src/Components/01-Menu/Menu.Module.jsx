import React from 'react'
import IconoTotto from './icono/icono.Module'
import BtnLogInLogOut from './IngresoUsuario/BtnLogInLogOut.Module'
import { Link } from "react-router-dom";
const Menu = () => {

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
                        <ul className="navbar-nav align-self-center">
                            <BtnLogInLogOut />
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Menu