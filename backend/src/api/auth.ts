import express from 'express';
import LoginUseCase from '../domain/usecases/auth/login';
import {AuthRoutes} from './routes/routes';

const app = express();

// Login expected body params
interface ILogin {
	email: string;
	password: string;
}

/**
 * @description Login endpoint 
 * @return {Promise<LoginResponse>}
 */
app.get(AuthRoutes.LOGIN, async (req, res) => {
	const body = req.body as ILogin;

	if (!body.email || !body.password) {
		res.status(400).json({
			error: {message: "Correo y/o contraseña no pueden estar vacíos"},
		});
		return;
	}

	// initializing the usecase 
    const usecase = new LoginUseCase();
	const result = await usecase.call({email: body.email, password: body.password});

	return res.json(result);
});

export default app;
