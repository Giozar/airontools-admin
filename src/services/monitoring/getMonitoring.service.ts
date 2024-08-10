import { ComputerActivity } from '@interfaces/Monitoring.interface';
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_APU_URL}/monitoring`;

const fetchComputerActivities = async (): Promise<ComputerActivity[]> => {
	try {
		const response = await axios.get<ComputerActivity[]>(BASE_URL);
		return response.data;
	} catch (error) {
		console.error('Error fetching computer activities:', error);
		throw error;
	}
};

export default fetchComputerActivities;
