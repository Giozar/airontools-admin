import { airontoolsAPI } from '@configs/api.config';
import axios from 'axios';

export const deleteFileService = async (url: string) => {
	try {
		// Enviar la URL en el cuerpo de la petición DELETE
		const response = await axios.delete(`${airontoolsAPI}/files/delete-file`, {
			data: { fileUrl: url }, // Aquí envías la URL en el body
		});
		return response.data;
	} catch (error) {
		throw new Error(`No se ha podido eliminar el archivo ${url}: ${error}`);
	}
};
