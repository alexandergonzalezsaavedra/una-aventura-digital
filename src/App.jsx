import Menu from "./Components/01-Menu/Menu.Module"
// React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Paginas
import PageCargarImagenes from "./Pages/CargarImagenes/PageCargarImagenes";
// Imagenes
import banner_01 from "./Img/inicio/banner-01.jpg"
// Componentes
import CardModalModule from "./Components/02-card-modal-home/CardModalModule";
import FiltroModule from "./Components/05-Filtro/Filtro.Module";
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
    <section>
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active bg-dark">
            <img src={banner_01} className="d-block w-100 opacity-50" alt="Una aventura digital" />
            <div className="carousel-caption d-none d-md-block">
            </div>
          </div>
        </div>
      </div>
      <div className="cont-home">
        <div className="container py-5">
          <h3 className="text-center fw-bold">
            Bienvenido a una aventura digital
          </h3>
          <p className="text-center">
            Comparte y conoce momentos especiales de nuestra comunidad
          </p>
          

      <div className="row filtroMomentos p-3 bg-light mt-4">
      <FiltroModule />
      </div>
      <p className="mt-3"><i className="far fa-star text-warning"></i> Momentos destacados por nuestra comunidad</p>
          <CardModalModule />
        </div>
      </div>
      
    </section>
  );
}
export default App;