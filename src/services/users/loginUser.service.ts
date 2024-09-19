import { transformUserDataFront } from '@adapters/user.adapter';
import { airontoolsAPI } from '@configs/api.config';
import { UserLoginResponse } from '@interfaces/User.interface';
import axios from 'axios';

export async function loginUserService(email: string, password: string) {
	const response = await axios.post<UserLoginResponse>(
		airontoolsAPI + '/auth/login',
		{
			email,
			password,
		},
	);

	const loggedUserData = response.data;
	const { token } = loggedUserData;
	localStorage.setItem('token', token);
	const user = transformUserDataFront(loggedUserData.user);

	return user;
}
