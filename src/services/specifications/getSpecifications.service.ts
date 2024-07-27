import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL + '/specifications';

export async function getSpecifications() {
	const response = await axios.get(apiUrl);
	return response.data;
}
