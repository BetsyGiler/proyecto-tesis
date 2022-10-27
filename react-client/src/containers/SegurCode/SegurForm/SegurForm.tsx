import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const SegurForm = () => {
  return (
    <form
      action=""
      className="border border-pink-600 bg-red-100 p-3 rounded-md w-80 md:w-96"
    >
      <h2 className="text-center text-2xl font-semibold mb-8 text-purple-900">
        Ingresa el código de seguridad
      </h2>

      <div className="flex flex-col text-justify">
        <label htmlFor="email">
          Comprueba si recibiste código de recuperación e ingresarlo.
        </label>
        &nbsp;
        <input
          id="number"
          name="number"
          type="text "
          className="border border-black mb-6"
        />
      </div>

      <div className="flex flex-row justify-center items-center my-5 mb-8">
        <Link to="/new-code" className="inline">
          <button className="w-26 bg-red-300 border border-black rounded-md text-lg px-3 text-center">
            Continuar
          </button>
        </Link>
      </div>
      <div className="text-left mt-1 text-blue-800 underline">
        <Link to="/restablecer-clave">¿No recibiste el código?</Link>
      </div>
    </form>
  );
};
export default SegurForm;
