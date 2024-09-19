import axios from 'axios';

export const deleteFileService = async (url: string) => {
	try {
		const response = await axios.delete(url);
		return response.data;
	} catch (error) {
		throw new Error(`No se ha podido eliminar el archivo ${url}: ${error}`);
	}
};
