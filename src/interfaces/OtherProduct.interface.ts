export interface CreateOtherProduct {
	name?: string;
	model: string;
	brand: string;
	description: string;
}

export interface UpdateOtherProduct {
	_id: string;
	name?: string;
	model?: string;
	brand?: string;
	description?: string;
}

export interface OtherProductContextProps {
	_id?: string;
	name?: string;
	setName: (value: string) => void;
	model: string;
	setModel: (value: string) => void;
	brand: string;
	setBrand: (value: string) => void;
	description: string;
	setDescription: (value: string) => void;
}
