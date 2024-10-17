import { AuthProvider, useAuthContext } from '@contexts/auth/AuthContext';
import {
	Navigate,
	Outlet,
	RouterProvider,
	createBrowserRouter,
	useLocation,
} from 'react-router-dom';

import { AlertProvider } from '@contexts/Alert/AlertContext';
import { ModalProvider } from '@contexts/Modal/ModalContext';
import BasePage from '@layouts/BasePage';
import ChatAssistant from '@pages/chatPages/chatAssistant';
import Notifications from '@pages/css/miscPages.tsx/notifications';
import Personal from '@pages/css/miscPages.tsx/PersonalInfo';
import Security from '@pages/css/miscPages.tsx/security';
import ErrorPage from '@pages/ErrorPages/ErrorPage';
import LandingPage from '@pages/generalPages/LandingPage';
import Login from '@pages/Login';
import Home from '@pages/MainPage';
import MonitoringMenu from '@pages/monitoringPages/MonitoringMenu';
import ProductMainPage from '@pages/ProductMainPage';
import ServiceMainPage from '@pages/ServiceMainPage';
import UserOptions from '@pages/userPages/UserOptions';
import { useEffect } from 'react';
import { productRoutes } from './routes/productRoutes';
import { serviceRoutes } from './routes/serviceRoutes';
import { userRoutes } from './routes/userRoutes';

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
		element: (
			<AlertProvider>
				<Login />
			</AlertProvider>
		),
	},
	{
		element: <PrivateRoute />,
		children: [
			{
				element: (
					<AlertProvider>
						<ModalProvider>
							<BasePage />
						</ModalProvider>
					</AlertProvider>
				),
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
								children: userRoutes(),
							},
							{
								path: 'productos',
								element: <ProductMainPage />,
							},
							{
								path: 'productos',
								children: productRoutes(),
							},
							{
								path: 'servicios',
								element: <ServiceMainPage />,
							},
							{
								path: 'servicios',
								children: serviceRoutes(),
							},

							{
								path: 'monitor',
								element: <MonitoringMenu />,
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
	// Para que se actualicen todas las paginas y se salga sesión
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
