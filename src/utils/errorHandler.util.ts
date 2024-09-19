import AxiosErrorCustom from '@classes/errors/AxiosErrorCustom.class';
import { AxiosError } from 'axios';

export function errorHandler(error: unknown): string {
	if (error instanceof AxiosError) {
		if (error.response) {
			const { response } = error as AxiosErrorCustom;
			return `Error al realizar la petición: ${Object.values(response.data)[0]}`;
		}
	}

	if (error instanceof Error) {
		return `Ocurrió un error inesperado: ${error.message}`;
	}

	return 'Ocurrió un error desconocido';
}

/*import AxiosErrorCustom from '@classes/errors/AxiosErrorCustom.class';
import { AxiosError } from 'axios';

export function errorHandler(error: unknown, callback?: Function) {
	if (error instanceof AxiosError) {
		if (error.response) {
			const { response } = error as AxiosErrorCustom;
			callback &&
				callback(
					`Error al realizar la petición: ${Object.values(response.data)[0]} `,
				);
			throw new AxiosErrorCustom(
				response,
				`Error al realizar la petición: \n ${Object.values(response.data)[0]}`,
			);
		}
	}

	if (error instanceof Error) {
		callback && callback(`Ocurrió un error inesperado: ${error}`);
	}
}
*/
