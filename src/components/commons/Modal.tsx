import '@components/css/Modal.css';
import React, { SetStateAction, useCallback, useState } from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	content: string;
	image?: string;
	withConfirmation?: boolean;
	cancelText?: string;
	confirmText?: string;
	withSecondConfirmation?: boolean;
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	title,
	content,
	image,
	withConfirmation = true,
	withSecondConfirmation = false,
	cancelText = 'Cancelar',
	confirmText = 'Continuar',
}) => {
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [showSecondConfirmation, setShowSecondConfirmation] = useState(false);

	const [inputValue, setInputValue] = useState('');
	const handleInputChange = (event: {
		target: { value: SetStateAction<string> };
	}) => {
		setInputValue(event.target.value);
	};

	const handleConfirm = useCallback(() => {
		if (withConfirmation) {
			setShowConfirmation(true);
		} else {
			handleFinalConfirm();
		}
	}, [withConfirmation]);

	const handleFinalConfirm = useCallback(() => {
		if (withSecondConfirmation) {
			setShowSecondConfirmation(true);
		} else {
			onConfirm();
			onClose();
		}
	}, [onConfirm, onClose, withSecondConfirmation]);

	const handleFirstCancel = useCallback(() => {
		setShowConfirmation(false);
	}, []);

	const handleSecondCancel = useCallback(() => {
		setShowSecondConfirmation(false);
	}, []);

	const handleFinalConfirmSecond = useCallback(() => {
		setShowSecondConfirmation(false);
		onConfirm();
		onClose();
	}, [onConfirm, onClose]);

	if (!isOpen) return null;

	return (
		<div className='modal-overlay'>
			<div className='modal'>
				<button className='modal__close-button' onClick={onClose}>
					×
				</button>
				<h2 className='modal__title'>{title}</h2>
				<p className='modal__content'>{content}</p>
				{image && <img src={image} alt='elemento a eliminar' />}
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
							Esta acción no se puede deshacer. Si estas seguro escribe:
							<span data-text=' Estoy Muy Muy Seguro'></span>
						</p>
						<input
							type='text'
							value={inputValue}
							onChange={handleInputChange}
							placeholder='Escribe aquí'
						/>

						<div className='modal__button-container'>
							<button
								type='button'
								className='modal__button modal__button--cancel'
								onClick={handleFirstCancel}
							>
								Cancelar
							</button>
							<button
								type='button'
								className='modal__button modal__button--confirm'
								onClick={
									inputValue === 'Estoy Muy Muy Seguro'
										? handleFinalConfirm
										: () => setInputValue('')
								}
							>
								Confirmar
							</button>
						</div>
					</div>
				)}

				{showSecondConfirmation && (
					<div className='modal__confirmation-modal'>
						<h3 className='modal__confirmation-title'>¿Estás seguro?</h3>
						<p className='modal__confirmation-content'>
							Esta acción no se puede deshacer, enserio. Si es enserio escribe:
							<span data-text='Es Enserio, Estoy Muy Seguro'></span>
						</p>
						<input
							type='text'
							value={inputValue}
							onChange={handleInputChange}
							placeholder='Escribe aquí'
						/>
						<div className='modal__button-container'>
							<button
								type='button'
								className='modal__button modal__button--cancel'
								onClick={handleSecondCancel}
							>
								Cancelar
							</button>
							<button
								type='button'
								className='modal__button modal__button--confirm'
								onClick={
									inputValue === 'Es Enserio, Estoy Muy Seguro'
										? handleFinalConfirmSecond
										: () => setInputValue('')
								}
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
