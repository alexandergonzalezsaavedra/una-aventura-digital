import { collection, getDocs } from "firebase/firestore";
import { db } from "../../index"
import { useEffect } from "react";
const CardModalModule = () => {
    const dataCard = document.querySelector("#dataCard")
    useEffect(() => {
        extrae()
    })
    const extrae = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "fotos-cargadas"));
            dataCard.innerHTML = ""
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
                dataCard.innerHTML += `
                <div class="col-sm-4">
                    <div class="card border-0 shadow mt-3">
                        <div class="card-body">
                            <div class="alto-div-img">
                                <img src=${doc.data().rutaImagen} alt="${doc.data().nombreImagen}" class="img-thumbnail" />
                            </div>
                            <p></p>
                            <p class="px-5 mt-3 txt-nombre-img-card">
                                <strong>${doc.data().nombreImagen}</strong>
                                <br />
                                <small class='fs-6'>Autor: ${doc.data().usuario}</small>
                            </p>
                        </div>
                        <div class="card-footer border-0 text-end pb-5">
                            <button class="btn btn-warning rounded-50" data-bs-toggle="modal" data-bs-target="#momento-totto-${doc.id}">
                                <i class="fas fa-image"></i> Más información
                            </button>
                        </div>
                    </div>
                    <div class="modal fade" id="momento-totto-${doc.id}" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content rounded-0">
                                <div class="modal-header border-0">
                                    <h5 class="modal-title" id="exampleModalLabel">
                                        <strong>${doc.data().nombreImagen}</strong>
                                        <br />
                                        <small>Autor: ${doc.data().usuario}</small>
                                    </h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body border-0">
                                    <img src="${doc.data().rutaImagen}" alt="${doc.data().nombreImagen}" class="img-thumbnail w-100" />
                                    <p class='fecha-modal'>
                                        ${doc.data().fechaCarga}
                                    </p>
                                    <p class="mt-3 px-3">
                                        ${doc.data().descripcion}
                                    </p>
                                </div>
                                <div class="modal-footer border-0">
                                    <button type="button" class="btn btn-outline-secondary rounded-0" data-bs-dismiss="modal">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `
            })
        } catch (error) {
        }
    }

    return (
        <>
            <div className="row" id="dataCard">
            </div>
        </>
    )
}

export default CardModalModule