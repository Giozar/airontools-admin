import { UserDataFrontend } from '@adapters/user.adapter';
import { getUsers } from '@services/users';
import { useEffect, useState } from 'react';

const useFetchUsers = (updateListFlag: boolean) => {
	const [usersList, setUsersList] = useState<UserDataFrontend[]>([]);
	const [filteredUsers, setFilteredUsers] = useState<UserDataFrontend[]>([]);
	const [, setSearchTerm] = useState<string>('');

	useEffect(() => {
		getUsers({ setUsersList, setFilteredUsers });
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
