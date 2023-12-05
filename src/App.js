import Menu from "./Components/01-Menu/Menu.Module"
// React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Paginas
import PageCargarImagenes from "./Pages/CargarImagenes/PageCargarImagenes";


const App = () => {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cargar-imagenes" element={<PageCargarImagenes />} />
      </Routes>
    </Router>
  )
}

const Home = () => {
  return (
    <>
      Inicio
    </>
  );
}

export default App;
