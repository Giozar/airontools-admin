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

export const downloadTechnicalDatasheet = async (productId: string) => {
	try {
		const pdfBlob = await getTechnicalDatasheet(productId);
		// Crear un enlace para descargar el PDF
		const url = URL.createObjectURL(pdfBlob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'technical_datasheet.pdf'; // Nombre del archivo para la descarga
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url); // Limpia la URL del objeto
	} catch (error) {
		console.error('Error al descargar el PDF:', error);
	}
};
