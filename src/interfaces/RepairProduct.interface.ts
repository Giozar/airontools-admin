export interface RepairProduct {
	_id?: string;
	name: string;
	productId?: string;
	brand: string;
	model: string;
	serialNumber?: string;
	description: string;
	quantity: number;
	imageUrl?: string;
	observation?: string;
	rawImage?: File | null;
}

export interface CreateRepairProduct {
	productId?: string;
	brand: string;
	model: string;
	serialNumber?: string;
	description: string;
	quantity: number;
	imageUrl?: string;
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
	imageUrl?: string;
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
	imageUrl?: string;
	setImageUrl: (value: string) => void;
	observation: string;
	setObservation: (value: string) => void;
}
