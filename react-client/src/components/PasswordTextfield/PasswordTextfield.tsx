import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, useState } from "react";

const PasswordTextField = (props: {
  name: string;
  value: string;
  placeholder: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`relative ${props.className}`}>
      <input
        id={props.name}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        type={showPassword ? "text" : "password"}
        className="p-1 border border-black w-full"
      />
      {showPassword === true ? (
        <FontAwesomeIcon
          onClick={togglePassword}
          className="cursor-pointer absolute right-2 top-1/4 text-gray-500"
          icon={faEye}
        />
      ) : (
        <FontAwesomeIcon
          onClick={togglePassword}
          className="cursor-pointer absolute right-2 top-1/4 text-gray-500"
          icon={faEyeSlash}
        />
      )}
    </div>
  );
};

export default PasswordTextField;
