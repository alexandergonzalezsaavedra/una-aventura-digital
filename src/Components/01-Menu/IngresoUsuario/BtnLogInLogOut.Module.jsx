import { useState } from "react";
import { useDispatch } from 'react-redux'
import { dataUser } from '../../../Reducer/InfoUser/infoUserSlice'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
const BtnLogInLogOut = () => {
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
                            <button className="btn btn-outline-dark"
                                onClick={handleAuth}
                            >
                                <i className="fas fa-sign-in-alt"></i>
                            </button>
                        )
                    } else {
                        return (
                            <button className="btn btn-outline-danger"
                                onClick={handleLogout}
                            >
                                <i className="fas fa-sign-out-alt"></i>
                            </button>
                        )
                    }
                })()
            }
        </>
    )
}

export default BtnLogInLogOut
