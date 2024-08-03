export default class CustomError extends Error {
	public readonly name: string;
	public readonly message: string;
	public readonly stack?: string;

	constructor(message: string) {
		super(message);
		this.name = this.constructor.name;
		this.message = message;

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		} else {
			this.stack = new Error(message).stack;
		}
	}
}
