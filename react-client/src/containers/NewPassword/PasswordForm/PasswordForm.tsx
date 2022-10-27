import { Link } from "react-router-dom";
import { useState } from "react";
import PasswordTextField from "../../../components/PasswordTextfield/PasswordTextfield";

const PasswordForm = () => {
  const [clave, setClave] = useState<string>("");
  const [repetirClave, setRepetirClave] = useState<string>("");

  return (
    <form
      action=""
      className="border border-pink-600 bg-red-100 p-3 rounded-md w-80 sm:w-96"
    >
      <h2 className="text-center text-2xl font-semibold mb-8 text-purple-900">
        Elige una contraseña nueva
      </h2>

      <div className="flex flex-col text-justify">
        <label htmlFor="email" className="mb-3">
          Crea una contraseña nueva de seis caracteres como mínimo. Una
          contraseña segura tiene una combinación de letras, números y signos de
          puntuación.
        </label>
        <PasswordTextField
          name="password"
          value={clave}
          placeholder="*******"
          onChange={(e) => {
            setClave(e.target.value);
          }}
          className="my-3"
        />
        <PasswordTextField
          name="repeat-password"
          value={repetirClave}
          placeholder="*******"
          onChange={(e) => {
            setRepetirClave(e.target.value);
          }}
          className="my-3"
        />
      </div>

      <div className="flex flex-row justify-center items-center my-12 mb-4">
        <Link to="/Login" className="inline">
          <button className="w-26 bg-red-300 border border-black rounded-md text-lg px-3 text-center">
            Guardar
          </button>
        </Link>
      </div>
    </form>
  );
};
export default PasswordForm;
