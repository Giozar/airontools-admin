import '@components/css/ModalContent.css';
import React from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
}

const ModalContent = ({ isOpen, onClose, title, children }: ModalProps) => {
	if (!isOpen) return null;

	return (
		<div className='modal-overlay'>
			<div className='modal-overlay__content'>
				<div className='modal-overlay__header'>
					<h2 className='modal-overlay__title'>{title}</h2>
					<button className='modal-overlay__close' onClick={onClose}>
						×
					</button>
				</div>
				<div className='modal-overlay__body'>{children}</div>
				<footer className='modal-overlay__footer'></footer>
			</div>
		</div>
	);
};

export default ModalContent;
