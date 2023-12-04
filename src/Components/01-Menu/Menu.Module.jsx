import React from 'react'
import IconoTotto from './icono/icono.Module'
import BtnLogInLogOut from './IngresoUsuario/BtnLogInLogOut.Module'
const Menu = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a href="/" className="navbar-brand fs-3 ubuntu" rel="noreferrer">
                    <IconoTotto />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse w-100" id="navbarTogglerDemo02">
                    <div className="d-flex justify-content-end w-100">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a href="/" className="nav-link" rel="noreferrer">
                                    Inicio
                                </a>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
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