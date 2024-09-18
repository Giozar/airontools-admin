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
			<div className='modal-content'>
				<div className='modal-header'>
					<h2>{title}</h2>
					<button className='modal-close' onClick={onClose}>
						×
					</button>
				</div>
				<div
					className='modal-body'
					style={{ overflowY: 'auto', maxHeight: '80vh' }}
				>
					{children}
				</div>
				<footer className='modal-footer'></footer>
			</div>
		</div>
	);
};

export default ModalContent;
