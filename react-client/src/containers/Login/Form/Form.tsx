import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import PasswordTextField from "../../../components/PasswordTextfield/PasswordTextfield";

const Form = () => {
  const [correo, setCorreo] = useState<string>("");
  const [clave, setClave] = useState<string>("");

  return (
    <form
      action=""
      className="border border-pink-500 bg-red-100 p-4 rounded-md w-80 md:w-96"
    >
      <h2 className="text-center text-3xl font-semibold mb-8 text-purple-900">
        Inicio de sesion
      </h2>

      <div className="flex flex-col mb-4">
        <label htmlFor="email">Direccion de correo electrónico</label>
        <input
          name="email"
          value={correo}
          placeholder="xxxxx@xxx.com"
          className="p-1 border border-black"
          onChange={(e) => {
            setCorreo(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password">Contraseña</label>
        <PasswordTextField
          name="password"
          value={clave}
          placeholder="*******"
          onChange={(e) => {
            setClave(e.target.value);
          }}
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
        <button className="w-24 bg-red-300 border border-black rounded-md text-lg px-3 text-center">
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
