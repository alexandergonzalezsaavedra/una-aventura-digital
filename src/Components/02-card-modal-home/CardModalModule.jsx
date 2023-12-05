import React from 'react'
import momento_01 from "../../Img/inicio/momento-01.webp"
const CardModalModule = () => {
    return (
        <>
            <div className="row">
                <div className="col-sm-4">
                    <div className="card border-0 shadow mt-3">
                        <div className="card-body">
                            <div className="alto-div-img">
                                <img src={momento_01} alt="momento destacado 1" className="img-thumbnail" />
                            </div>
                            <p className="px-5 mt-3 txt-nombre-img-card">
                                Nombre foto
                            </p>
                        </div>
                        <div className="card-footer border-0 text-end pb-5">
                            <button className="btn btn-warning rounded-50" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <i class="fas fa-image"></i> Más información
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content rounded-0">
                        <div className="modal-header border-0">
                            <h5 className="modal-title" id="exampleModalLabel">Nombre Foto</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body border-0">
                            <img src={momento_01} alt="momento destacado 1" className="img-thumbnail w-100" />
                            <p className="mt-3 px-3">
                                Descripción
                            </p>
                        </div>
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-outline-secondary rounded-0" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardModalModule