import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const RestabForm = () => {
  return (
    <form
      action=""
      className="border border-pink-600 bg-red-100 p-3 rounded-md w-80 md:w-96"
    >
      <h2 className="text-center text-2xl md:text-2xl font-semibold mb-6 text-purple-900">
        Restablece tu contraseña
      </h2>

      <div className="flex flex-col mb-4">
        <label htmlFor="email">
          ¿Cómo quieres que te enviemos el código para restablecer la
          contraseña?{" "}
        </label>
      </div>

      <div>
        <input type="checkbox" name="remember" id="remember" />
        <label htmlFor="checkbox" className="ml-1">
          Enviar código por correo
          <div className="mb-4">
            <label htmlFor="checkbox" className="ml-4">
              xxxxx@xxx.com
            </label>
          </div>
        </label>
      </div>

      <div>
        <input type="checkbox" name="remember" id="remember" />
        <label htmlFor="checkbox" className="ml-1">
          Enviar código por SMS
          <div className="mb-6">
            <label htmlFor="checkbox" className="ml-4">
              099999...
            </label>
          </div>
        </label>
      </div>

      <div className="flex flex-row justify-center items-center my-5 mb-6">
        <Link to="/codigo-seguridad" className="inline">
          <button className="w-24 bg-red-300 border border-black rounded-md text-lg px-3 text-center">
            Enviar
          </button>
        </Link>
      </div>

      <div className="text-left mt-1 text-blue-800 underline">
        <Link to="/recuperar-clave" className="inline">
          <FontAwesomeIcon className="text-black" icon={faArrowLeft} />
          {" Regresar"}
        </Link>
      </div>
    </form>
  );
};
export default RestabForm;
