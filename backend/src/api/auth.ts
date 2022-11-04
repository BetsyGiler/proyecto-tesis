import express from 'express';
import UserEntity from '../domain/entity/user';
import LoginUseCase from '../domain/usecases/auth/login';
import {AuthRoutes} from './routes/routes';
import RegisterUseCase from '../domain/usecases/auth/register';
import CheckSessionUseCase from '../domain/usecases/auth/check_session';
import LogoutUseCase from '../domain/usecases/auth/logout';

const app = express();

// Login expected body params
interface ILogin {
	email: string;
	password: string;
	ip?: string;
	userAgent?: string;
}

app.post(AuthRoutes.LOGOUT, async (req, res) => {
	const token = req.body.token;
	const logoutUseCase = new LogoutUseCase();
	try {
		const response = await logoutUseCase.call({token});
		res.json(response);
	}catch(e: any) {
		return res.status(400).json({error: e.sqlMessage});
	}
});

app.post(AuthRoutes.CHECK_SESSION, async (req, res) => {
	const token = req.body.token;

	const checkSession = new CheckSessionUseCase();
	try {
		const session = await checkSession.call({token});
		return res.json(session);
	} catch (e: any) {
		return res.status(400).json({error: e.sqlMessage});
	}
});

/**
 * @description Login endpoint 
 * @return {Promise<LoginResponse>}
 */
app.post(AuthRoutes.LOGIN, async (req, res) => {
	const body = req.body as ILogin;

	if (!body?.email || !body?.password) {
		res.status(400).json({
			error: {message: "email_password_required"},
		});
		return;
	}

	// initializing the usecase 
	const usecase = new LoginUseCase();
	try {
		const result = await usecase.call({
			email: body.email,
			password: body.password,
			ip: body.ip,
			userAgent: body.userAgent,
		});

		return res.json(result);
	} catch (e: any) {
		return res.status(400).json({
			error: {message: e.sqlMessage},
		});
	}
});

app.post(AuthRoutes.REGISTER, async (req, res) => {
	const body = req.body as UserEntity;

	const usecase = new RegisterUseCase();
	try {
		const result = await usecase.call({
			user: body,
			password: req.body.password,
		});

		return res.json(result);
	} catch (e: any) {
		return res.status(400).json({
			error: {message: e.sqlMessage},
		});
	}
});

export default app;
