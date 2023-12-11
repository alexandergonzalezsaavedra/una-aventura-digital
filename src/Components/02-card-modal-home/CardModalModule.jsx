import { collection, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../index"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from 'react-paginate';
const CardModalModule = () => {
    let { bNombre, bCategoria } = useSelector(state => state.dataFiltro)
    const [tarjetas, setTarjetas] = useState([])
    const momentosTotto = collection(db, "momentos-compartidos");
    useEffect(() => {
        getDocs(momentosTotto)
            .then((resp) => {
                setTarjetas(
                    resp.docs.map((doc) => {
                        return { ...doc.data(), id: doc.id }
                    })
                )
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    let resFiltro
    if (!bNombre && !bCategoria) {
        resFiltro = tarjetas
    } else {
        resFiltro = tarjetas.filter((dato) => {
            return (
                dato.nombreImagen.normalize("NFD").replace(/[\u0300-\u036f\u00E0-\u00FC]/g, '').toLowerCase().includes(bNombre.replace(/[\u0300-\u036f\u00E0-\u00FC]/g, '').toLocaleLowerCase())
                &&
                dato.categoria.normalize("NFD").replace(/[\u0300-\u036f\u00E0-\u00FC]/g, '').toLowerCase().includes(bCategoria.replace(/[\u0300-\u036f\u00E0-\u00FC]/g, '').toLocaleLowerCase())
            )
        })
    }


    const Items = ({ currentItems }) => {
        return (
            <>
                {
                    currentItems &&
                    currentItems.map((item, i) => {
                        let { nombreImagen, rutaImagen, usuario } = item
                        return (
                            <div key={i} className="col-sm-4">
                                <div className="card border-0 shadow mt-3">
                                    <div className="card-body">
                                        <div className="alto-div-img">
                                            <img src={rutaImagen} alt={nombreImagen} className="img-thumbnail" />
                                        </div>
                                        <small>

                                        </small>
                                        <p className="px-5 mt-3 txt-nombre-img-card">
                                            <strong>{nombreImagen}</strong>
                                            <br />
                                            <small className='fs-6'>Autor: {usuario}</small>
                                        </p>
                                    </div>
                                    <div className="card-footer border-0 py-4 d-flex justify-content-between">
                                        <button className="btn btn-outline-danger rounded-circle border-0">
                                            <i className="fas fa-heart"></i>
                                        </button>
                                        <button className="btn btn-outline-dark rounded-circle border-0" data-bs-toggle="modal" data-bs-target={`#momento-totto-${i}`}>
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )
                }
            </>
        );
    }
    function PaginatedItems({ itemsPerPage }) {
        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        const currentItems = resFiltro.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(resFiltro.length / itemsPerPage);
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % resFiltro.length;
            setItemOffset(newOffset);
        };
        return (
            <>
                <Items currentItems={currentItems} />
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    className="pagination d-flex justify-content-center mt-5"
                    pageClassName="page-item rounded-circle"
                    pageLinkClassName="page-link rounded-circle"
                    activeClassName="active rounded-circle"
                    previousClassName="page-item rounded-circle"
                    nextClassName="page-item rounded-circle"
                    previousLinkClassName="page-link rounded-circle"
                    nextLinkClassName="page-link rounded-circle"
                />
            </>
        );
    }

    // Modales
    let modalMomento = resFiltro.map((modal, idModal) => {
        let { nombreImagen, rutaImagen, usuario, fechaCarga, descripcion, comentarios, id } = modal


        const d = new Date();
        const anio = d.getFullYear();
        const mes = d.getMonth() + 1;
        const dia = d.getDate();
        const hora = d.getHours();
        const minutos = d.getMinutes();
        const segundos = d.getSeconds();
        const ms = d.getMilliseconds();
        const handleSubmitComent = async (e) => {
            let idComentario = `${anio}-${mes}-${dia}-h${hora}-${minutos}-${segundos}-${ms}`
            e.preventDefault()
            let dataComent = document.getElementById(`comentarioFotoMomento-${id}`)
            let nuevoComentario = { id: idComentario, mensaje: dataComent.value }
            const usuariosRef = doc(momentosTotto, id)
            let dato = await getDoc(usuariosRef)
            let listaComentarios = dato.data().comentarios
            let agregar = () => {
                listaComentarios.push(nuevoComentario)
            }
            agregar()
            updateDoc(usuariosRef, { comentarios: listaComentarios });
        }
        let displayComentarios = comentarios.map((comentario, iComentario) => {
            return (
                <div className="card" key={iComentario}>
                    <div className="card-body">
                        <p >
                            {comentario.mensaje}
                        </p>
                    </div>
                </div>
            )
        })
        return (
            <div key={idModal} className="modal fade" id={`momento-totto-${idModal}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content rounded-0">
                        <div className="modal-header border-0">
                            <h5 className="modal-title" id="exampleModalLabel">
                                <strong>{nombreImagen}</strong>
                                <br />
                                <small>Autor: {usuario}</small>
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body border-0">
                            <img src={rutaImagen} alt={nombreImagen} className="img-thumbnail w-100" />
                            <p className='fecha-modal'>
                                {fechaCarga}
                            </p>
                            <p className="mt-3 px-3">
                                {descripcion}
                            </p>
                            <div className="bg-light p-3">
                                <h3 className="text-warning">
                                    Comentarios
                                </h3>

                                <hr className="mb-5" />
                                <div className="container p-5">
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-sm-8">
                                            {displayComentarios}
                                        </div>
                                        <div className="col-sm-4">
                                            <h3>
                                                Dejanos tu comentario
                                            </h3>
                                            <form id={id} onSubmit={handleSubmitComent}>
                                                <div className="row">
                                                    <textarea
                                                        rows="5"
                                                        cols="30"
                                                        id={`comentarioFotoMomento-${id}`}
                                                        name={`comentarioFotoMomento-${id}`}
                                                    >
                                                    </textarea>
                                                </div>
                                                <div className="row">
                                                    <button
                                                        className="btn btn-outline-dark"
                                                    >
                                                        Enviar
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-0">
                            <button
                                type="button"
                                className="btn btn-outline-secondary rounded-0"
                                data-bs-dismiss="modal"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <>
            <div className="row">
                <PaginatedItems itemsPerPage={6} />
            </div>
            {modalMomento}
        </>
    )
}
export default CardModalModule