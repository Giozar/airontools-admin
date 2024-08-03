import AxiosErrorCustom from '@classes/errors/AxiosErrorCustom.class';
import { AxiosError } from 'axios';

export function errorHandler(error: unknown, callback?: Function) {
	if (error instanceof AxiosError) {
		if (error.response) {
			const { response } = error as AxiosErrorCustom;
			callback &&
				callback(
					`Error al crear las especificaciones: ${Object.values(response.data)[0]} `,
				);
			throw new AxiosErrorCustom(
				response,
				`Error al crear las especificaciones: \n ${Object.values(response.data)[0]}`,
			);
		}
	}

	if (error instanceof Error) {
		callback && callback(`Ocurrió un error inesperado: ${error}`);
	}
}
