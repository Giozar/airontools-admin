export interface RepairProduct {
	_id?: string;
	productId?: string;
	brand: string;
	model: string;
	serialNumber?: string;
	description: string;
	quantity: number;
	images?: string[];
	observation?: string;
}

export interface CreateRepairProduct {
	productId?: string;
	brand: string;
	model: string;
	serialNumber?: string;
	description: string;
	quantity: number;
	images?: string[];
	observation?: string;
}

export interface UpdateRepairProduct {
	_id: string;
	productId?: string;
	brand?: string;
	model?: string;
	serialNumber?: string;
	description?: string;
	quantity?: number;
	images?: string[];
	observation?: string;
}

export interface RepairProductContextProps {
	productId?: string;
	setProductId: (value: string) => void;
	brand: string;
	setBrand: (value: string) => void;
	model: string;
	setModel: (value: string) => void;
	serialNumber: string;
	setSerialNumber: (value: string) => void;
	description: string;
	setDescription: (value: string) => void;
	quantity: number;
	setQuantity: (value: number) => void;
	images?: string[];
	setImages: (value: string[]) => void;
	observation: string;
	setObservation: (value: string) => void;
}
