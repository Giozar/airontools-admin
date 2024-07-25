import { SetStateAction, useState } from 'react';
import './css/deletionModal.css'; // Assuming your CSS file path is correct

interface DeletionModalProps {
	id: string | null;
	name: string | null;
	image?: string;
	onClose: () => void;
	onCloseDelete: () => void;
	onDelete: () => void;
	message: string | null;
	confirmationInfo?: string; // Optional children for additional modal content
}

function DeletionModal({
	id,
	name,
	image,
	onClose,
	onCloseDelete,
	onDelete,
	message,
	confirmationInfo,
}: DeletionModalProps) {
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [message2, setMessage2] = useState('');

	const handleInputChange = (event: {
		target: { value: SetStateAction<string> };
	}) => {
		setInputValue(event.target.value);
	};
	const handleDeleteConfirm = () => {
		setMessage2('intenta de nuevo :(');
	};

	const handleDeleteClick = () => {
		if (id && name) {
			onDelete();
		}
	};

	const handleContinueClick = (mensaje: string) => {
		onClose();
		if (!mensaje.includes('No se ha podido eliminar')) {
			onCloseDelete();
		}
	};

	return (
		<div>
			<div className='deletionmodal'>
				<div className='deletionmodal-content'>
					{message ? (
						<div>
							<p>{message}</p>
							<button
								className='continue'
								onClick={() => handleContinueClick(message)}
							>
								Continuar
							</button>
						</div>
					) : (
						<>
							{' '}
							{!showConfirmationModal && (
								<>
									<h2>Confirmación de Eliminación</h2>
									<p>¿Estás seguro de que deseas eliminar a {name}?</p>
									{image && <img src={image} alt='elemento a eliminar' />}
									<h4>{id}</h4>
									<div className='buttons'>
										<button className='cancel' onClick={onClose}>
											Cancelar
										</button>
										<button
											className='delete'
											onClick={
												confirmationInfo
													? () => setShowConfirmationModal(true)
													: handleDeleteClick
											}
										>
											Eliminar
										</button>
									</div>
								</>
							)}
							{showConfirmationModal && (
								<>
									<h2>¿Estás seguro?</h2>
									<p className='warning'>{confirmationInfo}</p>
									<p>
										Si estas seguro escribe:
										<span data-text=' Estoy muy seguro'></span>
									</p>
									{message2}

									<input
										type='text'
										value={inputValue}
										onChange={handleInputChange}
										placeholder='Escribe aquí'
									/>

									<div className='buttons'>
										<button className='cancel' onClick={onClose}>
											Cancelar
										</button>
										<button
											className='delete'
											onClick={
												inputValue === 'Estoy muy seguro'
													? handleDeleteClick
													: handleDeleteConfirm
											}
											disabled={!inputValue.trim()}
										>
											Eliminar
										</button>
									</div>
								</>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default DeletionModal;
