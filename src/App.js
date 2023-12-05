import Menu from "./Components/01-Menu/Menu.Module"
import UpLoadImg from "./Components/04-upLoad/upLoadImg";
// Firebase

const App = ({ db }) => {
  return (
    <>
      <Menu />
      <h3>
        Inicio
      </h3>
      <UpLoadImg />
    </>
  );
}

export default App;
