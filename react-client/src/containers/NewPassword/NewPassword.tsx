import Logo from "../../components/Logo";
import PasswordForm from "./PasswordForm/PasswordForm";

const NewPassword = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-100">
      <Logo />
      <PasswordForm />

    </div>
  );
};

export default NewPassword;
