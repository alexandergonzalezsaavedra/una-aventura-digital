import { useSelector } from 'react-redux';
const UserData = () => {
    const { displayName } = useSelector(state => state.dataUsuario)
    return (
        <>
            {displayName}
        </>
    )
}
export default UserData