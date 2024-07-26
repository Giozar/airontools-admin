import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL + '/roles';

export async function getUserRoles() {
	const response = await axios.get(apiUrl);
	return response.data;
}
