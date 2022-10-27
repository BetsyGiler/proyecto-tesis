import Logo from "./Logo";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center bg-purple-900 p-1">
      <Logo className="w-48 my-2" />
      <div className="text-white flex flex-row text-xl mr-4">
        <Link to="/login">
          <h4>Iniciar sesion</h4>
        </Link>
        <h6 className="text-center w-10">|</h6>
        <h4>Registrarse</h4>
      </div>
    </div>
  );
};

export default Header;
