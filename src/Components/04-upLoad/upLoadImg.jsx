import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../index"
import { useState } from "react";
import { useSelector } from "react-redux";
const UpLoadImg = () => {
    let { displayName, accessToken } = useSelector(state => state.dataUsuario)
    if (accessToken === "") {
        window.location.replace("/")
    }
    const [rutaImg, setRutaImg] = useState("")
    const stateUploadImage = {
        picture: rutaImg
    }
    const [mostrarInfo, setMostrarInfo] = useState([])
    const [imagenStorage, setImagenStorage] = useState()
    const [imagenElegida, setImagenElegida] = useState()
    const handleUpload = (e) => {
        const file = e.target.files[0]
        const storage = getStorage();
        const storageRef = ref(storage, `/fotos-usuario/${file.name}`);
        setImagenElegida(file)
        setImagenStorage(storageRef)
    }
    const nuevaImagen = () => {
        document.querySelector("#formularioImagenes").classList.remove("d-none")
        document.querySelector("#cargarNuevaImagen").classList.add("d-none")
        document.querySelector("#imagenCargada").value = ""
        document.querySelector("#nombreImagen").value = ""
        document.querySelector("#descripcionImagen").value = ""
    }
    const handleUploadImage = async (e) => {
        e.preventDefault()
        uploadBytes(imagenStorage, imagenElegida).then((snapshot) => {
            console.log(snapshot.metadata)
            getDownloadURL(ref(imagenStorage))
                .then((url) => {
                    setRutaImg(url)
                    const nuevaInfo = {
                        usuario: displayName,
                        nombreImagen: document.querySelector("#nombreImagen").value,
                        rutaImagen: url,
                        fechaCarga: snapshot.metadata.updated,
                        descripcion: document.querySelector("#descripcionImagen").value,
                        comentarios: [],
                    }
                    const colleccion = collection(db, "fotos-cargadas")
                    addDoc(colleccion, nuevaInfo)
                    setMostrarInfo({
                        usuario: displayName,
                        nombreImagen: document.querySelector("#nombreImagen").value,
                        rutaImagen: url,
                        fechaCarga: snapshot.metadata.updated,
                        descripcion: document.querySelector("#descripcionImagen").value,
                        comentarios: [],
                    })
                })
                .catch((error) => {
                    console.log(error)
                });
        });
        document.querySelector("#formularioImagenes").classList.add("d-none")
        document.querySelector("#cargarNuevaImagen").classList.remove("d-none")
    }
    return (
        <>
            {
                (() => {
                    if (accessToken === "") {
                        return
                    } else {
                        return (
                            <section className="cont-formulario-carga py-5">
                                <div className="container">
                                    <h3 className="text-center mb-5">
                                        Comparte tus experiencias
                                    </h3>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="bg-light p-5" id="formularioImagenes">
                                                <form onSubmit={handleUploadImage}>
                                                    <label className="form-label">Seleccione una imagen</label>
                                                    <input type="file" id="imagenCargada" className="form-control shadow border border-1 rounded-0" onChange={handleUpload} required />
                                                    <br />
                                                    <label className="form-label">Nombre de la imagen</label>
                                                    <input type="text" id="nombreImagen" className="form-control shadow border border-1 rounded-0" required />
                                                    <br />
                                                    <label className="form-label">Descripción de la imagen</label>
                                                    <textarea className="form-control shadow border border-1 rounded-0" rows="5" id="descripcionImagen" name="text" required></textarea>
                                                    <br />
                                                    <button className="btn btn-primary w-100 rounded-0">
                                                        Enviar
                                                    </button>
                                                </form>
                                            </div>
                                            <div className="d-none p-5" id="cargarNuevaImagen">
                                                <div className="alert alert-info w-100 text-center" role="alert">
                                                    La imagen se cargo con exito
                                                </div>
                                                <br />
                                                <button className="btn btn-primary w-100" onClick={nuevaImagen}>
                                                    Cargar Nueva imagen
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            {
                                                (() => {
                                                    if (stateUploadImage.picture === "") {
                                                        return (
                                                            <>
                                                                <div className="alert alert-warning text-center" role="alert">
                                                                    Cargue una imagen a la galeria
                                                                </div>
                                                            </>
                                                        )
                                                    } else {
                                                        return (
                                                            <>
                                                                <div className="card">
                                                                    <div className="card-header bg-light">
                                                                        <p className="fs-4 text-center my-0">
                                                                            <strong>
                                                                                {mostrarInfo.nombreImagen}
                                                                            </strong>
                                                                        </p>
                                                                    </div>
                                                                    <div className="card-body">
                                                                        <div className="text-center">
                                                                            <img className="img-thumbnail mx-auto" width="350" height="auto" src={rutaImg} alt={mostrarInfo.nombreImagen} />
                                                                        </div>
                                                                        <br />
                                                                        <p className="p-3">
                                                                            {mostrarInfo.descripcion}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                    }
                                                })()
                                            }
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )
                    }
                })()
            }
        </>
    )
}
export default UpLoadImg