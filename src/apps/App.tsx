import { UserDataFrontend } from '@adapters/user.adapter';
import React, { createContext, useState } from 'react';
import {
	BrowserRouter,
	Navigate,
	Outlet,
	Route,
	Routes,
} from 'react-router-dom';

import UserOptionCreate from '@pages/userPages/UserOptionCreate';
import UserOptionEdit from '@pages/userPages/UserOptionEdit';
import UserOptions from '@pages/userPages/UserOptions';

import Login from '@pages/Login';
import Home from '@pages/MainPage';

import CategorizationMenu from '@pages/specificationsPages/CategorizationMenu';
import CreateFamily from '@pages/specificationsPages/CreateFamily';
import EditFamily from '@pages/specificationsPages/EditFamily';
import UserOptionCreateRole from '@pages/userPages/UserOptionCreateRole';

interface AuthContextType {
	isAuthenticated: boolean;
	user: UserDataFrontend | null;
	setAuth: (auth: {
		isAuthenticated: boolean;
		user: UserDataFrontend | null;
	}) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);

function App() {
	const [auth, setAuth] = useState<{
		isAuthenticated: boolean;
		user: UserDataFrontend | null;
	}>({
		isAuthenticated: false,
		user: null,
	});

	return (
		<>
			<AuthContext.Provider value={{ ...auth, setAuth }}>
				<BrowserRouter>
					<Routes>
						<Route path='/login' element={<Login />} />
						<Route element={<PrivateRoute />}>
							<Route element={<PrivateRouteOptionUser />}>
								<Route path='/home' element={<Home />} />
								<Route path='/home/solo-editor' element={<Home />} />
								<Route element={<PrivateRouteOptionUserAdmin />}>
									<Route path='/home/usuarios' element={<UserOptions />} />
									<Route
										path='/home/usuarios/crear-usuario'
										element={<UserOptionCreate />}
									/>
									<Route
										path='/home/usuarios/editar-usuario'
										element={<UserOptionEdit />}
									/>
									<Route
										path='/home/usuarios/crear-rol'
										element={<UserOptionCreateRole />}
									/>
									<Route
										path='/home/categorizacion'
										element={<CategorizationMenu />}
									/>
									<Route
										path='/home/categorizacion/crear-familia'
										element={<CreateFamily />}
									/>
									<Route
										path='/home/categorizacion/editar-familia'
										element={<EditFamily />}
									/>
								</Route>
							</Route>
						</Route>
					</Routes>
				</BrowserRouter>
			</AuthContext.Provider>
		</>
	);
}

const PrivateRoute = () => {
	const authContext = React.useContext(AuthContext);
	if (!authContext) return null;
	return authContext.isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

const PrivateRouteOptionUser = () => {
	const authContext = React.useContext(AuthContext);
	if (!authContext) return null;
	return authContext.isAuthenticated ? <Outlet /> : <Navigate to='/home' />;
};

const PrivateRouteOptionUserAdmin = () => {
	const authContext = React.useContext(AuthContext);
	if (!authContext) return null;
	return authContext.isAuthenticated &&
		authContext.user?.roles === 'Administrador' ? (
		<Outlet />
	) : (
		<Navigate to='/home' />
	);
};

export default App;
