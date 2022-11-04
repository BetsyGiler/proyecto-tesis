/**
 * The response of the register use case
 */
interface LoginResponse {
	cedula?: string;
	token?: string;
	role?: string;
	message: string;
}

export default LoginResponse;
