// Esta interfaz se encargará de los productos en la orden
export interface OrderProduct {
	quantity: number;
	brand: string;
	model: string;
	serialNumber: string;
	description: string;
	observation: string;
	rawImage: File | null;
	createdBy: string;
}
