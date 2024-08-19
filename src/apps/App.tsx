import { AuthContext, AuthProvider } from '@contexts/AuthContext';
import React from 'react';
import {
	BrowserRouter,
	Navigate,
	Outlet,
	Route,
	Routes,
} from 'react-router-dom';

import { Role } from '@interfaces/Role.interface';
import Notifications from '@pages/css/miscPages.tsx/notifications';
import Personal from '@pages/css/miscPages.tsx/PersonalInfo';
import Security from '@pages/css/miscPages.tsx/security';
import CategorizationMenu from '@pages/familyPages/CategorizationMenu';
import CreateFamily from '@pages/familyPages/CreateFamily';
import EditFamily from '@pages/familyPages/EditFamily';
import Login from '@pages/Login';
import Home from '@pages/MainPage';
import MonitoringMenu from '@pages/monitoringPages/MonitoringMenu';
import CreateSpecification from '@pages/specificationsPages/CreateSpecification';
import EditSpecification from '@pages/specificationsPages/EditSpecification';
import ListOfSpecs from '@pages/specificationsPages/ListOfSpecs';
import CreateTool from '@pages/toolPages/CreateTool';
import EditTool from '@pages/toolPages/EditTool';
import ToolMenu from '@pages/toolPages/ToolMenu';
import UserOptionCreate from '@pages/userPages/UserOptionCreate';
import UserOptionCreateRole from '@pages/userPages/UserOptionCreateRole';
import UserOptionEdit from '@pages/userPages/UserOptionEdit';
import UserOptions from '@pages/userPages/UserOptions';

const App = () => {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Login />} />
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
			</BrowserRouter>
		</AuthProvider>
	);
};

const PrivateRoute = () => {
	const authContext = React.useContext(AuthContext);
	if (!authContext) return null;
	return authContext.isAuthenticated ? <Outlet /> : <Navigate to='/' />;
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

export default App;
