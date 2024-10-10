import { OtherProductContextProps } from '@interfaces/OtherProduct.interface';
import { createContext, ReactNode, useContext, useState } from 'react';

// Crear el contexto de OtherProduct
const OtherProductContext = createContext<OtherProductContextProps | null>(
	null,
);

// Proveedor del contexto de OtherProduct
export const OtherProductProvider = ({ children }: { children: ReactNode }) => {
	// Estados para cada propiedad de OtherProduct
	const [name, setName] = useState<string>('');
	const [model, setModel] = useState<string>('');
	const [brand, setBrand] = useState<string>('');
	const [description, setDescription] = useState<string>('');

	return (
		<OtherProductContext.Provider
			value={{
				name,
				setName,
				model,
				setModel,
				brand,
				setBrand,
				description,
				setDescription,
			}}
		>
			{children}
		</OtherProductContext.Provider>
	);
};

// Hook personalizado para usar el contexto de OtherProduct
export const useOtherProductContext = () => {
	const context = useContext(OtherProductContext);
	if (!context) {
		throw new Error(
			'useOtherProductContext debe ser usado dentro de un OtherProductProvider',
		);
	}
	return context;
};
