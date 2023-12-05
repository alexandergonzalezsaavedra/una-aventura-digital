import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";
const UpLoadImg = () => {

    const [estadoCarga, setEstadoCarga] = useState(0)
    const [rutaImg, setRutaImg] = useState("")
    const stateUploadImage = {
        usuario: "",
        upLoadValue: estadoCarga,
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
        console.log(storageRef)
    }

    const handleUploadImage = e => {
        e.preventDefault()


        uploadBytes(imagenStorage, imagenElegida).then((snapshot) => {
            let storage = getStorage()
            getDownloadURL(ref(storage, 'images/stars.jpg')).then((url) => {
                console.log(url)
            })
        });

    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6">
                    <form onSubmit={handleUploadImage}>
                        <progress value={estadoCarga} max="100"></progress>
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
                                        <img width="350" height="350" src="" alt="nombre" />
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