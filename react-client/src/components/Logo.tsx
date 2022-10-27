import logo from "../assets/logo.png";

const Logo = (props: { className?: string }) => {
  return (
    <div className={`my-5 mx-6 w-60 ${props.className}`}>
      <img
        className="object-contain rounded-lg"
        src={logo}
        alt="Fernanda Cadena"
      />
    </div>
  );
};

export default Logo;
