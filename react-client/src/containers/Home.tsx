import Producto1 from "../assets/producto-1.jpeg";
import Producto2 from "../assets/producto-2.jpeg";
import Header from "../components/Header";
import ImageVisor from "../components/ImageVisor/ImageVisor";

const Home = () => {
  return (
    <div className="bg-[url('/images/fondo.jpeg')] min-h-screen bg-cover">
      <Header />
      <div className="mx-auto container">
        <ImageVisor images={[Producto1, Producto2, Producto1, Producto2]} />
        <h2>Productos destacados</h2>
        <div className="flex flex-row justify-between">
          <img
            className="mx-4 w-64 h-64 object-contain bg-black bg-opacity-10"
            src={Producto1}
            alt=""
          />
          <img
            className="mx-4 w-64 h-64 object-contain bg-black bg-opacity-10"
            src={Producto2}
            alt=""
          />
          <img
            className="mx-4 w-64 h-64 object-contain bg-black bg-opacity-10"
            src={Producto1}
            alt=""
          />
          <img
            className="mx-4 w-64 h-64 object-contain bg-black bg-opacity-10"
            src={Producto2}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
