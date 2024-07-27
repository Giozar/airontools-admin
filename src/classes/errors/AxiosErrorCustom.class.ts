import { ErrorResponse } from '@interfaces/ErrorResponse';
import { AxiosResponse } from 'axios';
import CustomError from './CustomError.class';

interface AxiosResponseCustom extends AxiosResponse {
	data: ErrorResponse;
}

export default class AxiosErrorCustom extends CustomError {
	public readonly response: AxiosResponseCustom;

	constructor(response: AxiosResponseCustom, message: string) {
		super(message);
		this.response = response;
	}
}
