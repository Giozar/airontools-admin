import { useCallback, useState } from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	content: string;
	cancelText?: string;
	confirmText?: string;
}

export default function Modal({
	isOpen,
	onClose,
	onConfirm,
	title,
	content,
	cancelText = 'Cancelar',
	confirmText = 'Continuar',
}: ModalProps) {
	const [showConfirmation, setShowConfirmation] = useState(false);

	const handleConfirm = useCallback(() => {
		setShowConfirmation(true);
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

			<style jsx>{`
				.modal-overlay {
					display: flex;
					position: fixed;
					top: 0;
					right: 0;
					bottom: 0;
					left: 0;
					justify-content: center;
					align-items: center;
					background-color: rgba(0, 0, 0, 0.5);
				}

				.modal {
					position: relative;
					border-radius: 5px;
					background-color: black;
					padding: 20px;
					width: 80%;
					max-width: 500px;
				}

				.modal__close-button {
					position: absolute;
					top: 10px;
					right: 10px;
					cursor: pointer;
					border: none;
					background: none;
					font-size: 20px;
				}

				.modal__title {
					margin-top: 0;
				}

				.modal__button-container {
					display: flex;
					justify-content: flex-end;
					margin-top: 20px;
				}

				.modal__button {
					cursor: pointer;
					margin-left: 10px;
					border: none;
					border-radius: 3px;
					padding: 10px 20px;
				}

				.modal__button--cancel {
					background-color: #101010;
				}

				.modal__button--confirm {
					background-color: #007bff;
					color: white;
				}

				.modal__confirmation-modal {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
					border-radius: 5px;
					background-color: black;
					padding: 20px;
				}

				.modal__confirmation-title {
					margin-top: 0;
				}

				.modal__confirmation-content {
					margin-bottom: 20px;
				}
			`}</style>
		</div>
	);
}
