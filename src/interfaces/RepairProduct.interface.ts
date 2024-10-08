export interface RepairProduct {
	_id?: string; // ID opcional de MongoDB si se obtiene de la base de datos
	productId?: string; // ID del producto (interno)
	brand: string; // Marca del producto
	model: string; // Modelo del producto
	serialNumber?: string; // Número de serie del producto (opcional)
	description: string; // Descripción del estado y fallas del producto
	quantity: number; // Cantidad de productos
	images?: string[]; // Imágenes opcionales del producto
	observations?: string[]; // Observaciones adicionales
}
