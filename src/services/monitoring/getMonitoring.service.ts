import { ComputerActivity } from '@interfaces/Monitoring.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

const fetchComputerActivities = async (): Promise<ComputerActivity[]> => {
	try {
		const response = await axios.get<ComputerActivity[]>(
			`${import.meta.env.VITE_API_URL}/monitoring`,
		);
		console.log(response.data);
		return response.data;
	} catch (error) {
		errorHandler(error);
		return [];
	}
};

export default fetchComputerActivities;
