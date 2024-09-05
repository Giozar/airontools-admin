import { AuthContext, AuthProvider } from '@contexts/AuthContext';
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from 'react-router-dom';

import Notifications from '@pages/css/miscPages.tsx/notifications';
import LandingPage from '@pages/generalPages/LandingPage';
import Login from '@pages/Login';
import Home from '@pages/MainPage';
import React, { ReactNode, useEffect } from 'react';

const PrivateRoute = ({ element }: { element: ReactNode }) => {
	const authContext = React.useContext(AuthContext);
	const selectedCompany = localStorage.getItem('selectedCompany');

	if (!authContext) return null;
	return authContext.isAuthenticated ? (
		element
	) : selectedCompany ? (
		<Navigate
			to={`/login/${selectedCompany}`}
			state={{ from: location }}
			replace
		/>
	) : (
		<Navigate to='/' />
	);
};

const router = createBrowserRouter([
	{
		path: '/',
		element: <LandingPage />,
	},
	{
		path: 'login/:company',
		element: <Login />,
	},
	{
		path: 'home',
		element: <PrivateRoute element={<Home />} />,
	},
	{
		path: 'notificaciones',
		element: <PrivateRoute element={<Notifications />} />,
	},
]);

const App = () => {
	//Para que se actualicen todas las paginas y se salga sesión
	useEffect(() => {
		const handleStorageChange = (event: StorageEvent) => {
			if (event.key === 'token' && !localStorage.getItem('token')) {
				const corp = localStorage.getItem('selectedCompany');
				window.location.href = `/login/${corp}`;
			}
		};
		window.addEventListener('storage', handleStorageChange);
		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);

	return (
		<AuthProvider>
			<RouterProvider router={router} />
			{/*<BrowserRouter>
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/login/:company' element={<Login />} />
					
					<Route element={<PrivateRoute />}>
						<Route element={<PrivateRouteOptionUser />}>
							<Route path='/home' element={<Home />} />
							<Route path='/notificaciones' element={<Notifications />} />
							<Route path='/seguridad' element={<Security />} />
							<Route path='/informacion-personal' element={<Personal />} />
							<Route path='/home/solo-editor' element={<Home />} />
							<Route element={<PrivateRouteOptionUserAdmin />}>
								<Route path='/home/usuarios' element={<UserOptions />} />
								<Route
									path='/home/usuarios/crear-usuario'
									element={<UserOptionCreate />}
								/>
								<Route path='/chat-con-asistente' element={<ChatAssistant />} />
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
								<Route
									path='/home/categorizacion/especificaciones/crear-especificaciones'
									element={<CreateSpecification />}
								/>
								<Route
									path='/home/categorizacion/especificaciones'
									element={<ListOfSpecs />}
								/>
								<Route
									path='/home/categorizacion/especificaciones/editar-especificacion'
									element={<EditSpecification />}
								/>

								<Route path='/home/monitor' element={<MonitoringMenu />} />
							</Route>
							<Route path='/home/herramientas' element={<ToolMenu />} />
							<Route
								path='/home/herramientas/crear-herramienta'
								element={<CreateTool />}
							/>
							<Route
								path='/home/herramientas/editar-herramienta'
								element={<EditTool />}
							/>
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>*/}
		</AuthProvider>
	);
};
/*
const PrivateRoute = () => {
	const authContext = React.useContext(AuthContext);
	const selectedCompany = localStorage.getItem('selectedCompany');

	if (!authContext) return null;
	return authContext.isAuthenticated ? (
		<Outlet />
	) : selectedCompany ? (
		<Navigate to={`/login/${selectedCompany}`} />
	) : (
		<Navigate to='/' />
	);
};

const PrivateRouteOptionUser = () => {
	const authContext = React.useContext(AuthContext);
	if (!authContext) return null;
	return authContext.isAuthenticated ? <Outlet /> : <Navigate to='/home' />;
};

const PrivateRouteOptionUserAdmin = () => {
	const authContext = React.useContext(AuthContext);
	const role = authContext?.user?.role as Role;
	if (!authContext) return null;
	return authContext.isAuthenticated && role?.name === 'Administrador' ? (
		<Outlet />
	) : (
		<Navigate to='/home' />
	);
};
*/
export default App;
