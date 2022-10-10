import Home from "home/views/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "../auth/views/Login";

/**
 * Routes that can be accessed only if the user is not on session
 */
const nonSessionRoutes = {
	login: "/login",
}

/**
 * Routes that can be accessed regardless of the user session
 */
const publicRoutes = {
	home: "/",
}

/**
 * Represents all the prossible routes for the whole application
 */
export const allRoutes = {
	...nonSessionRoutes,
	...publicRoutes,
}

/**
 * Router component for the whole application
 */
export function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={nonSessionRoutes.login} element={<Login />} />
				<Route path={publicRoutes.home} element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
}
