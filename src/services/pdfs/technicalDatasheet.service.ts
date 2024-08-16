import axios, { AxiosResponse } from 'axios';

// Usa la variable de entorno para la URL base
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Define la función para obtener el PDF del producto
export const getTechnicalDatasheet = async (
	productId: string,
): Promise<Blob> => {
	try {
		// Realiza la solicitud al endpoint especificado
		const response: AxiosResponse<Blob> = await axios.get(
			`${API_BASE_URL}/basic-reports/product/${productId}`,
			{
				responseType: 'blob', // Especifica que la respuesta será un archivo binario
			},
		);

		// Verifica que la respuesta tenga éxito y contiene datos
		if (response.status === 200 && response.data) {
			return response.data;
		} else {
			throw new Error('No se pudo obtener el archivo PDF');
		}
	} catch (error) {
		console.error('Error al obtener el technical datasheet:', error);
		throw error; // Re-lanzar el error para que el consumidor pueda manejarlo
	}
};
