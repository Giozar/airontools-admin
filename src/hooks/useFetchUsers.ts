import axios from 'axios';
import { useEffect, useState } from 'react';
import {
	transformUserData,
	UserDataBackend,
	UserDataFrontend,
} from '../adapters/user.adapter';

const useFetchUsers = (updateListFlag: boolean) => {
	const [usersList, setUsersList] = useState<UserDataFrontend[]>([]);
	const [filteredUsers, setFilteredUsers] = useState<UserDataFrontend[]>([]);
	const [, setSearchTerm] = useState<string>('');

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get<UserDataBackend[]>(
					'http://localhost:4000/auth/users',
				);
				const transformedUsers = response.data.map(user => ({
					...transformUserData(user),
				}));
				setUsersList(transformedUsers);
				setFilteredUsers(transformedUsers);
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		};

		fetchUsers();
	}, [updateListFlag]);

	const handleSearch = (searchTerm: string) => {
		const term = searchTerm.toLowerCase();
		setSearchTerm(term);
		const filtered = usersList.filter(user =>
			user.name.toLowerCase().includes(term),
		);
		setFilteredUsers(filtered);
	};

	return {
		usersList,
		setUsersList,
		filteredUsers,
		setFilteredUsers,
		handleSearch,
	};
};

export default useFetchUsers;
