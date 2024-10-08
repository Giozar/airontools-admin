import '@components/css/Modal.css';
import Markdown from 'markdown-to-jsx';
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
	markdown: boolean;
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
	markdown = false,
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

				<div className='modal__content'>
					{markdown ? <Markdown>{content}</Markdown> : content}
				</div>
				{image && (
					<img className='modal__image' src={image} alt='elemento a eliminar' />
				)}
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
							Esta acción no se puede deshacer. Si estás seguro escribe:
							<span className='modal__confirmation-highlight'>
								Estoy Muy Muy Seguro
							</span>
						</p>
						<input
							type='text'
							className='modal__input'
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
							Esta acción no se puede deshacer, en serio. Si es en serio
							escribe:
							<span className='modal__confirmation-highlight'>
								Es Enserio, Estoy Muy Seguro
							</span>
						</p>
						<input
							type='text'
							className='modal__input'
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
