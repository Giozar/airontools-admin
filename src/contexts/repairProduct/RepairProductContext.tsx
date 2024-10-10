import { RepairProductContextProps } from '@interfaces/RepairProduct.interface';
import { createContext, ReactNode, useContext, useState } from 'react';

// Crear el contexto de RepairProduct
const RepairProductContext = createContext<RepairProductContextProps | null>(
	null,
);

// Proveedor del contexto de RepairProduct
export const RepairProductProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	// Estados para cada propiedad de RepairProduct
	const [productId, setProductId] = useState<string | undefined>(undefined);
	const [brand, setBrand] = useState<string>('');
	const [model, setModel] = useState<string>('');
	const [serialNumber, setSerialNumber] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [quantity, setQuantity] = useState<number>(1);
	const [images, setImages] = useState<string[] | undefined>(undefined);
	const [observation, setObservation] = useState<string>('');

	return (
		<RepairProductContext.Provider
			value={{
				productId,
				setProductId,
				brand,
				setBrand,
				model,
				setModel,
				serialNumber,
				setSerialNumber,
				description,
				setDescription,
				quantity,
				setQuantity,
				images,
				setImages,
				observation,
				setObservation,
			}}
		>
			{children}
		</RepairProductContext.Provider>
	);
};

// Hook personalizado para usar el contexto de RepairProduct
export const useRepairProductContext = () => {
	const context = useContext(RepairProductContext);
	if (!context) {
		throw new Error(
			'useRepairProductContext debe ser usado dentro de un RepairProductProvider',
		);
	}
	return context;
};
