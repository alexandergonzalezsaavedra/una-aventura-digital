import { collection, getDocs } from "firebase/firestore";
import { db } from "../../index"
import { useEffect, useState } from "react";
const CardModalModule = () => {
    // const dataCard = document.querySelector("#dataCard")
    const [tarjetas, setTarjetas] = useState([])
    useEffect(() => {
        const momentosTotto = collection(db, "fotos-cargadas");
        getDocs(momentosTotto)
            .then((resp) => {
                setTarjetas(
                    resp.docs.map((doc) => {
                        return { ...doc.data(), id: doc.id }
                    })
                )
            })
    }, [])


    console.log(tarjetas)

    const display = tarjetas.map((item, i) => {
        return (
            <div className="col-sm-4">
                <div className="card border-0 shadow mt-3">
                    <div className="card-body">
                        <div className="alto-div-img">
                            <img src={item.rutaImagen} alt={item.nombreImagen} className="img-thumbnail" />
                        </div>
                        <p></p>
                        <p className="px-5 mt-3 txt-nombre-img-card">
                            <strong>{item.nombreImagen}</strong>
                            <br />
                            <small className='fs-6'>Autor: {item.usuario}</small>
                        </p>
                    </div>
                    <div className="card-footer border-0 text-end pb-5">
                        <button className="btn btn-warning rounded-50" data-bs-toggle="modal" data-bs-target={`#momento-totto-${i}`}>
                            <i className="fas fa-image"></i> Más información
                        </button>
                    </div>
                </div>
                <div className="modal fade" id={`momento-totto-${i}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content rounded-0">
                            <div className="modal-header border-0">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    <strong>{item.nombreImagen}</strong>
                                    <br />
                                    <small>Autor: {item.usuario}</small>
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body border-0">
                                <img src={item.rutaImagen} alt={item.nombreImagen} className="img-thumbnail w-100" />
                                <p className='fecha-modal'>
                                    {item.fechaCarga}
                                </p>
                                <p className="mt-3 px-3">
                                    {item.descripcion}
                                </p>
                            </div>
                            <div className="modal-footer border-0">
                                <button type="button" className="btn btn-outline-secondary rounded-0" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })


    return (
        <>
            <div className="row">
                {display}
            </div>
        </>
    )
}

export default CardModalModule