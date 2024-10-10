import { OtherProductContextProps } from '@interfaces/OtherProduct.interface';
import { createContext, ReactNode, useContext } from 'react';

// Crear el contexto de OtherProduct
const OtherProductContext = createContext<OtherProductContextProps | null>(
	null,
);

// Proveedor del contexto de OtherProduct
export const OtherProductProvider = ({ children }: { children: ReactNode }) => {
	return (
		<OtherProductContext.Provider value={{}}>
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
