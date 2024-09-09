import { AuthProvider, useAuthContext } from '@contexts/auth/AuthContext';
import {
	Navigate,
	Outlet,
	RouterProvider,
	createBrowserRouter,
	useLocation,
} from 'react-router-dom';

import { ProductCreateProvider } from '@contexts/product/ProductContext';
import BasePage from '@layouts/BasePage';
import ChatAssistant from '@pages/chatPages/chatAssistant';
import Notifications from '@pages/css/miscPages.tsx/notifications';
import Personal from '@pages/css/miscPages.tsx/PersonalInfo';
import Security from '@pages/css/miscPages.tsx/security';
import ErrorPage from '@pages/ErrorPages/ErrorPage';
import CategorizationMenu from '@pages/familyPages/CategorizationMenu';
import CreateFamily from '@pages/familyPages/CreateFamily';
import EditFamily from '@pages/familyPages/EditFamily';
import LandingPage from '@pages/generalPages/LandingPage';
import Login from '@pages/Login';
import Home from '@pages/MainPage';
import MonitoringMenu from '@pages/monitoringPages/MonitoringMenu';
import CreateProductPage from '@pages/productPages/CreateProductPage';
import EditProductPage from '@pages/productPages/EditProductPage';
import ToolMenu from '@pages/productPages/ProductMenu';
import CreateSpecification from '@pages/specificationsPages/CreateSpecification';
import EditSpecification from '@pages/specificationsPages/EditSpecification';
import ListOfSpecs from '@pages/specificationsPages/ListOfSpecs';
import UserOptionCreate from '@pages/userPages/UserOptionCreate';
import UserOptionCreateRole from '@pages/userPages/UserOptionCreateRole';
import UserOptionEdit from '@pages/userPages/UserOptionEdit';
import UserOptions from '@pages/userPages/UserOptions';
import { useEffect } from 'react';

const PrivateRoute = () => {
	const { auth, loading } = useAuthContext();
	const location = useLocation();
	const selectedCompany = localStorage.getItem('selectedCompany');

	if (loading) {
		return <div>cargando...</div>;
	}

	return auth ? (
		<Outlet />
	) : selectedCompany ? (
		<Navigate
			to={`/login/${selectedCompany}`}
			state={{ from: location }}
			replace
		/>
	) : (
		<Navigate to='/' replace />
	);
};

const PrivateRouteAdmin = () => {
	const { user, auth, loading } = useAuthContext();
	if (!user) return null;

	if (loading) {
		return <div>cargando...</div>;
	}

	// console.log(user);

	return auth && user?.role?.name === 'Administrador' ? (
		<Outlet />
	) : (
		<Navigate to='/home' replace />
	);
};

const router = createBrowserRouter([
	{
		path: '/',
		element: <LandingPage />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/login/:company',
		element: <Login />,
	},
	{
		element: <PrivateRoute />,
		children: [
			{
				element: <BasePage />,
				children: [
					{
						path: 'home',
						element: <Home />,
					},
					{
						path: '',
						element: <PrivateRouteAdmin />,
						children: [
							{
								path: 'chat-con-asistente',
								element: <ChatAssistant />,
							},
						],
					},
					{
						path: 'home',
						element: <PrivateRouteAdmin />,
						children: [
							{
								path: 'usuarios',
								element: <UserOptions />,
							},
							{
								path: 'usuarios',
								children: [
									{
										path: 'crear-usuario',
										element: <UserOptionCreate />,
									},
									{
										path: 'editar-usuario',
										element: <UserOptionEdit />,
									},
									{
										path: 'crear-rol',
										element: <UserOptionCreateRole />,
									},
								],
							},
							{
								path: 'categorizacion',
								element: <CategorizationMenu />,
							},
							{
								path: 'categorizacion',
								children: [
									{
										path: 'crear-familia',
										element: <CreateFamily />,
									},
									{
										path: 'editar-familia',
										element: <EditFamily />,
									},
									{
										path: 'especificaciones',
										element: <ListOfSpecs />,
									},
									{
										path: 'especificaciones',
										children: [
											{
												path: 'crear-especificaciones',
												element: <CreateSpecification />,
											},
											{
												path: 'editar-especificacion',
												element: <EditSpecification />,
											},
										],
									},
								],
							},
							{
								path: 'monitor',
								element: <MonitoringMenu />,
							},
						],
					},
					{
						path: 'home',
						children: [
							{
								path: 'herramientas',
								element: <ToolMenu />,
							},

							{
								path: 'herramientas',

								children: [
									{
										path: 'crear-herramienta',
										element: (
											<ProductCreateProvider>
												<CreateProductPage />
											</ProductCreateProvider>
										),
									},
									{
										path: 'editar-herramienta',
										element: (
											<ProductCreateProvider>
												<EditProductPage />
											</ProductCreateProvider>
										),
									},
								],
							},
						],
					},
					{
						path: 'notificaciones',
						element: <Notifications />,
					},
					{
						path: 'seguridad',
						element: <Security />,
					},
					{
						path: 'informacion-personal',
						element: <Personal />,
					},
				],
			},
		],
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
		</AuthProvider>
	);
};

export default App;
