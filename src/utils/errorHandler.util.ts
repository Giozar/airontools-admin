import AxiosErrorCustom from '@classes/errors/AxiosErrorCustom.class';
import { AxiosError } from 'axios';

export function errorHandler(error: unknown) {
	if (error instanceof AxiosError) {
		if (error.response) {
			const { response } = error as AxiosErrorCustom;
			throw new AxiosErrorCustom(
				response,
				`Error al realizar la petición: \n ${Object.values(response.data)[0]}`,
			);
		}
	}

	if (error instanceof Error) {
		throw new Error(`Ocurrió un error inesperado: ${error}`);
	}
}
