import axios from 'axios';

export const deleteFileService = async (fileId: string) => {
	try {
		const response = await axios.delete(fileId);
		return response.data;
	} catch (error) {
		throw new Error(`No se ha podido eliminar el archivo ${fileId}: ${error}`);
	}
};
