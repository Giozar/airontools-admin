import './css/deletionModal.css';

interface DeletionModalProps {
	id: string | null;
	name: string | null;
	image?: string;
	onClose: () => void;
	onCloseDelete: () => void;
	onDelete: () => void;
	message: string | null;
}

function DeletionModal({
	id,
	name,
	image,
	onClose,
	onCloseDelete,
	onDelete,
	message,
}: DeletionModalProps) {
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
						<h2>Confirmación de Eliminación</h2>
						<p>¿Estás seguro de que deseas eliminar a {name}?</p>
						{image ? <img src={image} alt='elemento a eliminar' /> : ''}
						<h4>{id}</h4>
						<div className='buttons'>
							<button className='cancel' onClick={onClose}>
								Cancelar
							</button>
							<button className='delete' onClick={handleDeleteClick}>
								Eliminar
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default DeletionModal;
