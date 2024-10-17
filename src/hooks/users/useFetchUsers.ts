import { UserDataFrontend } from '@interfaces/User.interface';
import { getUsersService } from '@services/users';
import { useCallback, useEffect, useState } from 'react';

const useFetchUsers = () => {
	const [usersList, setUsersList] = useState<UserDataFrontend[]>([]);
	const [filteredUsers, setFilteredUsers] = useState<UserDataFrontend[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [update, setUpdate] = useState(false);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const users = await getUsersService();
				setUsersList(users);
				setFilteredUsers(users); // Inicialmente, no hay filtro
			} catch (error) {
				console.error('Failed to fetch users:', error);
			}
		};
		fetchUsers();
	}, [update]);

	const userSelectOptions = () => {
		if (!usersList) return [{ value: '', label: '' }];
		return usersList.map(user => ({
			value: user.id,
			label: user.name,
		}));
	};

	const handleSearch = useCallback((term: string) => {
		setSearchTerm(term.toLowerCase());
	}, []);

	useEffect(() => {
		const filtered = usersList.filter(user =>
			user.name.toLowerCase().includes(searchTerm),
		);
		setFilteredUsers(filtered);
	}, [searchTerm, usersList]);

	return {
		usersList,
		setUsersList,
		filteredUsers,
		setFilteredUsers,
		userSelectOptions,
		handleSearch,
		update,
		setUpdate,
	};
};

export default useFetchUsers;
