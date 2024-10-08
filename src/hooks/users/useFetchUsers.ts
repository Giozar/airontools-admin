import { UserDataFrontend } from '@interfaces/User.interface';
import { getUsersService } from '@services/users';
import { useCallback, useEffect, useState } from 'react';

const useFetchUsers = () => {
	const [usersList, setUsersList] = useState<UserDataFrontend[]>([]);
	const [filteredUsers, setFilteredUsers] = useState<UserDataFrontend[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>('');

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
	}, [usersList]);

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
		handleSearch,
	};
};

export default useFetchUsers;
