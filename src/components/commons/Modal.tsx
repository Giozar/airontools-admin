// Modal.tsx
import '@components/css/Modal.css';
import React, { useCallback, useState } from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	content: string;
	withConfirmation?: boolean;
	cancelText?: string;
	confirmText?: string;
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	title,
	content,
	withConfirmation = true,
	cancelText = 'Cancelar',
	confirmText = 'Continuar',
}) => {
	const [showConfirmation, setShowConfirmation] = useState(false);

	const handleConfirm = useCallback(() => {
		if (withConfirmation) {
			setShowConfirmation(true);
		} else {
			onConfirm();
			onClose();
		}
	}, [onConfirm, onClose, withConfirmation]);

	const handleFinalConfirm = useCallback(() => {
		setShowConfirmation(false);
		onConfirm();
		onClose();
	}, [onConfirm, onClose]);

	const handleCancel = useCallback(() => {
		setShowConfirmation(false);
	}, []);

	if (!isOpen) return null;

	return (
		<div className='modal-overlay'>
			<div className='modal'>
				<button className='modal__close-button' onClick={onClose}>
					×
				</button>
				<h2 className='modal__title'>{title}</h2>
				<p className='modal__content'>{content}</p>
				<div className='modal__button-container'>
					<button
						type='button'
						className='modal__button modal__button--cancel'
						onClick={onClose}
					>
						{cancelText}
					</button>
					<button
						type='button'
						className='modal__button modal__button--confirm'
						onClick={handleConfirm}
					>
						{confirmText}
					</button>
				</div>

				{showConfirmation && (
					<div className='modal__confirmation-modal'>
						<h3 className='modal__confirmation-title'>¿Estás seguro?</h3>
						<p className='modal__confirmation-content'>
							Esta acción no se puede deshacer.
						</p>
						<div className='modal__button-container'>
							<button
								type='button'
								className='modal__button modal__button--cancel'
								onClick={handleCancel}
							>
								Cancelar
							</button>
							<button
								type='button'
								className='modal__button modal__button--confirm'
								onClick={handleFinalConfirm}
							>
								Confirmar
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Modal;

/*import '@components/css/Modal.css';
import { useCallback, useState } from 'react';
interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	content: string;
	withConfirmation?: boolean;
	cancelText?: string;
	confirmText?: string;
}

export default function Modal({
	isOpen,
	onClose,
	onConfirm,
	title,
	content,
	withConfirmation = true,
	cancelText = 'Cancelar',
	confirmText = 'Continuar',
}: ModalProps) {
	const [showConfirmation, setShowConfirmation] = useState(false);

	const handleConfirm = useCallback(() => {
		if (withConfirmation) {
			setShowConfirmation(true);
		} else {
			onConfirm();
			close();
		}
	}, []);

	const handleFinalConfirm = useCallback(() => {
		setShowConfirmation(false);
		onConfirm();
	}, [onConfirm]);

	const handleCancel = useCallback(() => {
		setShowConfirmation(false);
	}, []);

	if (!isOpen) return null;

	return (
		<div className='modal-overlay'>
			<div className='modal'>
				<button className='modal__close-button' onClick={onClose}>
					×
				</button>
				<h2 className='modal__title'>{title}</h2>
				<p className='modal__content'>{content}</p>
				<div className='modal__button-container'>
					<button
						type='button'
						className='modal__button modal__button--cancel'
						onClick={onClose}
					>
						{cancelText}
					</button>
					<button
						type='button'
						className='modal__button modal__button--confirm'
						onClick={handleConfirm}
					>
						{confirmText}
					</button>
				</div>

				{showConfirmation && (
					<div className='modal__confirmation-modal'>
						<h3 className='modal__confirmation-title'>¿Estás seguro?</h3>
						<p className='modal__confirmation-content'>
							Esta acción no se puede deshacer.
						</p>
						<div className='modal__button-container'>
							<button
								type='button'
								className='modal__button modal__button--cancel'
								onClick={handleCancel}
							>
								Cancelar
							</button>
							<button
								type='button'
								className='modal__button modal__button--confirm'
								onClick={handleFinalConfirm}
							>
								Confirmar
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
*/
