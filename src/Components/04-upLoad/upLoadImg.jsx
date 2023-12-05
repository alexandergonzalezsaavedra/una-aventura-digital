import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../index"
import { useState } from "react";
const UpLoadImg = () => {
    const [rutaImg, setRutaImg] = useState("")
    const stateUploadImage = {
        usuario: "",
        upLoadValue: 100,
        picture: rutaImg
    }
    const [imagenStorage, setImagenStorage] = useState()
    const [imagenElegida, setImagenElegida] = useState()
    const handleUpload = (e) => {
        const file = e.target.files[0]
        const storage = getStorage();
        const storageRef = ref(storage, `/fotos-usuario/${file.name}`);
        setImagenElegida(file)
        setImagenStorage(storageRef)
    }
    console.log(db)
    const handleUploadImage = async (e) => {
        e.preventDefault()


        uploadBytes(imagenStorage, imagenElegida).then((snapshot) => {
            getDownloadURL(ref(imagenStorage))
                .then((url) => {
                    // const xhr = new XMLHttpRequest();
                    // xhr.responseType = 'blob';
                    // xhr.onload = () => {
                    //     const blob = xhr.response;
                    //     console.log("secargo la imagen" + blob)
                    // };
                    // xhr.open('GET', url);
                    // xhr.send();
                    setRutaImg(url)
                })
                .catch((error) => {
                    console.log(error)
                });
        });

        const nuevaInfo = {
            usuario: "prueba",
            nombreImagen: "",
            rutaImagen: "alexander",
            fechaCarga: "",
            descripcion: ""
        }
        const colleccion = collection(db, "fotos-cargadas")
        addDoc(colleccion, nuevaInfo)
    }
    // function agregar() {
    //     db.collection("fotos-cargadas").add({
    //         usuario: "prueba",
    //         nombreImagen: "",
    //         rutaImagen: "alexander",
    //         fechaCarga: "",
    //         descripcion: ""
    //     })
    // }
    // console.log(db)
    // const agregarInfo = () => {
    //     addDoc(collection(db, "fotos-cargadas"), {
    //         usuario: "",
    //         nombreImagen: "",
    //         rutaImagen: rutaImg,
    //         fechaCarga: "",
    //         descripcion: ""
    //     });
    // }
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6">
                    <form onSubmit={handleUploadImage}>
                        <progress value={stateUploadImage.upLoadValue} max="100"></progress>
                        <br />
                        <label>Seleccione una imagen</label>
                        <input type="file" className="form-control" onChange={handleUpload} />
                        <br />
                        <button className="btn btn-outline-success">
                            Enviar
                        </button>
                    </form>
                </div>
                <div className="col-sm-6">
                    {
                        (() => {
                            if (stateUploadImage.picture === "") {
                                return (
                                    <>
                                        <p>
                                            Seleccione una imagen
                                        </p>
                                    </>
                                )
                            } else {
                                return (
                                    <>
                                        <p>
                                            Imagen cargada
                                        </p>
                                        <img width="100%" height="auto" src={rutaImg} alt="nombre" />
                                    </>
                                )
                            }
                        })()
                    }

                </div>
            </div>
        </div>
    )
}
export default UpLoadImg