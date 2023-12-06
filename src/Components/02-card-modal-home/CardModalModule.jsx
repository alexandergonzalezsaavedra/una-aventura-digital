import { collection, getDocs } from "firebase/firestore";
import { db } from "../../index"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from 'react-paginate';
const CardModalModule = () => {
    let {bNombre,bCategoria} = useSelector(state => state.dataFiltro)
    const [tarjetas, setTarjetas] = useState([])
    useEffect(() => {
        const momentosTotto = collection(db, "momentos-compartidos");
        getDocs(momentosTotto)
            .then((resp) => {
                setTarjetas(
                    resp.docs.map((doc) => {
                        return { ...doc.data(), id: doc.id }
                    })
                )
            })
    }, [])

    console.log(bNombre + "  " + bCategoria)
    let resFiltro
    if(!bNombre && !bCategoria){
        resFiltro = tarjetas
    }else{
        resFiltro = tarjetas.filter((dato) => {
            return(
                dato.nombreImagen.normalize("NFD").replace(/[\u0300-\u036f\u00E0-\u00FC]/g, '').toLowerCase().includes(bNombre.replace(/[\u0300-\u036f\u00E0-\u00FC]/g, '').toLocaleLowerCase())
                &&
                dato.categoria.normalize("NFD").replace(/[\u0300-\u036f\u00E0-\u00FC]/g, '').toLowerCase().includes(bCategoria.replace(/[\u0300-\u036f\u00E0-\u00FC]/g, '').toLocaleLowerCase())
            )
        })
    }
    function Items({ currentItems }) {
    return (
        <>
        {currentItems &&
            currentItems.map((item,i) => (
                <div key={i} className="col-sm-4">
                <div className="card border-0 shadow mt-3">
                    <div className="card-body">
                        <div className="alto-div-img">
                            <img src={item.rutaImagen} alt={item.nombreImagen} className="img-thumbnail" />
                        </div>
                        <small>

                        </small>
                        <p className="px-5 mt-3 txt-nombre-img-card">
                            <strong>{item.nombreImagen}</strong>
                            <br />
                            <small className='fs-6'>Autor: {item.usuario}</small>
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
            ))}
        </>
    );
    }
    function PaginatedItems({ itemsPerPage }) {
        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        const currentItems = resFiltro.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(resFiltro.length / itemsPerPage);
        const handlePageClick = (event) => {
          const newOffset = (event.selected * itemsPerPage) % resFiltro.length;
          console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
          );
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
    return (
        <>
            <div className="row">
                <PaginatedItems itemsPerPage={6} />
            </div>
        </>
    )
}
export default CardModalModule