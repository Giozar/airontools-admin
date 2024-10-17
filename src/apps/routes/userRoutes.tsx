import { UserProvider } from '@contexts/User/UserContext';
import UserOptionCreate from '@pages/userPages/UserOptionCreate';
import UserOptionCreateRole from '@pages/userPages/UserOptionCreateRole';
import UserOptionEdit from '@pages/userPages/UserOptionEdit';

export const userRoutes = () => {
	return [
		{
			path: 'crear-usuario',
			element: (
				<UserProvider>
					<UserOptionCreate />
				</UserProvider>
			),
		},
		{
			path: 'editar-usuario',
			element: (
				<UserProvider>
					<UserOptionEdit />
				</UserProvider>
			),
		},
		{
			path: 'crear-rol',
			element: <UserOptionCreateRole />,
		},
	];
};
