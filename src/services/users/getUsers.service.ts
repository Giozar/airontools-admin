import {
	transformUserData,
	UserDataBackend,
	UserDataFrontend,
} from '@adapters/user.adapter';
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';

export async function getUsers({
	setUsersList,
	setFilteredUsers,
}: {
	setUsersList: Dispatch<SetStateAction<UserDataFrontend[]>>;
	setFilteredUsers: Dispatch<SetStateAction<UserDataFrontend[]>>;
}) {
	try {
		const response = await axios.get<UserDataBackend[]>(
			import.meta.env.VITE_API_URL + '/auth',
		);
		const transformedUsers = response.data.map(user => ({
			...transformUserData(user),
		}));
		setUsersList(transformedUsers);
		setFilteredUsers(transformedUsers);
	} catch (error) {
		console.error('Error fetching users:', error);
	}
}
