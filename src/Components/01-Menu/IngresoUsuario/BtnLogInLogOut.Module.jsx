import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { dataUser } from '../../../Reducer/InfoUser/infoUserSlice'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";
const BtnLogInLogOut = () => {
    const { displayName } = useSelector(state => state.dataUsuario)
    let dispatchUser = useDispatch()
    const [token, setToken] = useState("")
    const handleAuth = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                setToken(token)
                const user = result.user;
                dispatchUser(dataUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    accessToken: user.stsTokenManager.accessToken
                }))
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(errorCode + errorMessage + email + credential)
            });
    }
    const handleLogout = () => {
        const auth = getAuth();
        dispatchUser(dataUser({
            uid: "",
            email: "",
            displayName: "",
            photoURL: "",
            accessToken: ""
        }))
        signOut(auth).then(() => {
            setToken("")
        }).catch((error) => {
            console.log(error)
        });
    }
    return (
        <>
            {
                (() => {
                    if (!token) {
                        return (
                            <li className="nav-item">
                                <button className="btn btn-sm btn-outline-dark rounded-0"
                                    onClick={handleAuth}
                                >
                                    Ingresar con gmail <i class="fab fa-google text-danger"></i>
                                </button>
                            </li>
                        )
                    } else {
                        return (
                            <>
                                <li className="nav-item">
                                    <NavLink to="/cargar-imagenes" className="nav-link">
                                        Cargar imagenes
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-sm btn-outline-danger rounded-0"
                                        onClick={handleLogout}
                                    >
                                        {displayName} <i className="fas fa-sign-out-alt"></i>
                                    </button>
                                </li>
                            </>
                        )
                    }
                })()
            }
        </>
    )
}
export default BtnLogInLogOut