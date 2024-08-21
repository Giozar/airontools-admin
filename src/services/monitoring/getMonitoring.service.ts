import { airontoolsAPI } from '@configs/api.config';
import { ComputerActivity } from '@interfaces/Monitoring.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

const fetchComputerActivities = async (): Promise<ComputerActivity[]> => {
	try {
		const response = await axios.get(`${airontoolsAPI}/monitoring`);
		console.log(response.data);
		return response.data;
	} catch (error) {
		errorHandler(error);
		return [];
	}
};

export default fetchComputerActivities;
