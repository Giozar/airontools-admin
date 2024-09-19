// AlertContext.tsx
import Alert from '@components/commons/AlertComponent';
import { createContext, ReactNode, useContext, useState } from 'react';

type AlertType = 'success' | 'warning' | 'error';

interface AlertContextType {
	showAlert: (message: string, type: AlertType) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
	const [alert, setAlert] = useState<{
		message: string;
		type: AlertType;
	} | null>(null);

	const showAlert = (message: string, type: AlertType) => {
		setAlert({ message, type });
		setTimeout(() => setAlert(null), 3000); // Auto-cerrar después de 3 segundos
	};

	return (
		<AlertContext.Provider value={{ showAlert }}>
			{children}
			{alert && (
				<Alert
					message={alert.message}
					type={alert.type}
					onClose={() => setAlert(null)}
				/>
			)}
		</AlertContext.Provider>
	);
};

export const useAlert = () => {
	const context = useContext(AlertContext);
	if (!context) {
		throw new Error('useAlert debe ser usado dentro de un AlertProvider');
	}
	return context;
};
