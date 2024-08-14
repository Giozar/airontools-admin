import axios from 'axios';

export const deleteFileService = async (fileId: string) => {
	try {
		await axios.delete(fileId);
		return `El archivo ${fileId} ha sido eliminado correctamente.`;
	} catch (error) {
		throw new Error(`No se ha podido eliminar el archivo ${fileId}: ${error}`);
	}
};
