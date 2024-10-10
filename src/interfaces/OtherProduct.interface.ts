export interface OtherProduct {
	_id: string;
	name: string;
	model: string;
	brand: string;
	description: string;
	createdBy: string;
	updatedBy: string;
}

export interface CreateOtherProduct {
	name?: string;
	model: string;
	brand: string;
	description: string;
	createdBy: string;
}

export interface UpdateOtherProduct {
	_id: string;
	name?: string;
	model?: string;
	brand?: string;
	description?: string;
	updatedBy?: string;
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
	rawImage: File | null;
	setRawImage: (value: File) => void;
	createdBy: string;
	setCreatedBy: (value: string) => void;
	updatedBy: string;
	setUpdatedBy: (value: string) => void;
}
