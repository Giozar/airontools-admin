// ModalContext.tsx
import Modal from '@components/commons/Modal';
import React, {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useState,
} from 'react';

interface ModalContextType {
	openModal: (
		title: string,
		content: string,
		onConfirm: () => void,
		withConfirmation?: boolean,
		withSecondConfirmation?: boolean,
	) => void;
	closeModal: () => void;
	modalState: {
		isOpen: boolean;
		title: string;
		content: string;
		onConfirm: () => void;
		withConfirmation: boolean;
		withSecondConfirmation: boolean;
	};
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [modalState, setModalState] = useState({
		isOpen: false,
		title: '',
		content: '',
		onConfirm: () => {},
		withConfirmation: true,
		withSecondConfirmation: true,
	});

	const openModal = useCallback(
		(
			title: string,
			content: string,
			onConfirm: () => void,
			withConfirmation = true,
			withSecondConfirmation = true,
		) => {
			setModalState({
				isOpen: true,
				title,
				content,
				onConfirm,
				withConfirmation,
				withSecondConfirmation,
			});
		},
		[],
	);

	const closeModal = useCallback(() => {
		setModalState(prev => ({ ...prev, isOpen: false }));
	}, []);

	return (
		<ModalContext.Provider value={{ openModal, closeModal, modalState }}>
			{children}
			{modalState.isOpen && (
				<Modal
					title={modalState.title}
					content={modalState.content}
					onConfirm={modalState.onConfirm}
					onClose={closeModal}
					withConfirmation={modalState.withConfirmation}
					withSecondConfirmation={modalState.withSecondConfirmation}
					isOpen={true}
				/>
			)}
		</ModalContext.Provider>
	);
};

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error('useModal must be used within a ModalProvider');
	}
	return context;
};