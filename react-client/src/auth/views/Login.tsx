import {Button, FormControl} from "@mui/material";
import {Link} from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import StandardInput from "components/inputs/StandardInput";
import {PersonAdd} from "@mui/icons-material";


/**
 * Login screen component
 */
const Login = () => {

	// Handle a login request to the backend
	const handleFormSubmit = (e: any) => {
		e.preventDefault();
	}

	return (
		<div
			className={
				"flex flex-col w-screen h-screen"
				+ " items-center justify-center"
			}
		>
			<div
				className={
					"flex flex-col px-4 my-2 mx-auto py-8 items-center shadow-md rounded-md"
				}
			>
				<h1
					className="text-xl font-bold mb-4"
				>
					Inicio de sesión
				</h1>
				<FormControl
					onSubmit={handleFormSubmit}
				>

					<StandardInput
						isRequired
						label="Correo electrónico"
						name="email"
						error="Error de ejemplo"
						placeholder="alguien@host.com"
					/>
					<br />

					<StandardInput
						isRequired
						label="Contraseña"
						name="password"
						isPassword
						placeholder="********"
					/>

					<Link
						className={
							"mt-4 text-sm text-blue-500 mx-auto"
						}
						to="#"
					>
						¿Olvidaste tu contraseña?
					</Link>
					<br />

					<div id="opt-buttons" className="flex flex-row justify-evenly">
						<Button 
							variant="contained"
							color="warning"
							endIcon={<PersonAdd />}
						>
							Registrarse
						</Button>
						<div
							className="mx-2"
						>
						</div>
						<Button 
							variant="contained"
							endIcon={<LoginIcon />}
						>
							Ingresar
						</Button>
					</div>
				</FormControl>
			</div>
		</div>
	);
}

export default Login;

