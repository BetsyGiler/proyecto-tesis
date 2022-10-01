import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Form = () => {
  return (
    <form
      action=""
      className="border border-pink-600 bg-red-100 p-4 rounded-md"
    >
      <h2 className="text-center text-2xl font-semibold mb-6">
        Inicio de sesion
      </h2>
      <div className="flex flex-col mb-4">
        <label htmlFor="email">Direccion de correo electrónico</label>
        <input
          id="email"
          name="email"
          type="text"
          className="border border-black w-96"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          name="password"
          type="text"
          className="border border-black w-96"
        />
      </div>
      <div className="text-right mt-1 text-blue-800 underline">
        <Link to="/recuperar-clave">¿Ha olvidado su contraseña?</Link>
      </div>
      <div>
        <input type="checkbox" name="remember" id="remember" />
        <label htmlFor="checkbox" className="ml-1">
          Recordar
        </label>
      </div>
      <div className="flex flex-row justify-center items-center my-5">
        <button className="w-24 bg-red-300 border border-black rounded-sm text-lg px-3 text-center">
          Ingresar
        </button>
      </div>
      <div className="text-left mt-1 text-blue-800 underline">
        <Link to="/" className="inline">
          <FontAwesomeIcon className="text-black" icon={faArrowLeft} />
          {" Regresar"}
        </Link>
      </div>
    </form>
  );
};

export default Form;
