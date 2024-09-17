import Modal from '@components/commons/Modal';
import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useFamilyCreateContext } from '@contexts/categorization/FamilyContext';
import { useEditCategorization } from '@hooks/families/useEditCategorization';
import '@pages/css/createFamily.css';
import { useState } from 'react';
/**
 * Permite la edición y eliminación de una familia existente.
 *
 * Este componente muestra un formulario para editar una familia. Incluye campos para actualizar el nombre,
 * la descripción y la imagen de la familia. También ofrece la opción de eliminar la familia mediante un modal
 * de confirmación. La gestión del estado de la familia y las acciones de edición y eliminación se manejan
 * a través de los contextos y hooks proporcionados.
 *
 * @returns {JSX.Element} - Un componente que muestra un formulario para editar una familia, con opciones
 *   para actualizar la información y eliminar la familia, incluyendo un modal de confirmación para la eliminación.
 */
export default function EditFamily() {
	const { ...familyToCreate } = useFamilyCreateContext();
	const { handleUpdateFamily, handleDeleteFamily } = useEditCategorization();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	const handleConfirm = () => {
		console.log('Acción confirmada');
		if (familyToCreate.id) handleDeleteFamily(familyToCreate.id);
		closeModal();
	};

	return (
		<>
			<h2>
				Familia {familyToCreate.name}
				<button type='button' className='delete' onClick={openModal}>
					Eliminar familia
				</button>
			</h2>
			<TextInput
				id={'family'}
				label={'Nombre de familia:'}
				value={familyToCreate.name}
				placeholder={'Familia 1'}
				onChange={e => familyToCreate.setName(e.target.value)}
				required={true}
			/>
			<br></br>
			<TextAreaInput
				id={'description'}
				label={'Descripción de familia:'}
				value={familyToCreate.description}
				placeholder={'Introduce la descripción de la familia...'}
				onChange={e => familyToCreate.setDescription(e.target.value)}
				rows={6}
			/>
			<SingleImageChange
				title={`Imagen de Familia:`}
				filePreview={
					familyToCreate.rawImage
						? URL.createObjectURL(familyToCreate.rawImage)
						: !familyToCreate.imageToDelete
							? familyToCreate.image
							: ''
				}
				setFilePreview={file => {
					familyToCreate.setRawImage(file);
				}}
				setFileToDelete={familyToCreate.setImageToDelete}
			/>
			<button type='button' onClick={handleUpdateFamily} className='add'>
				Actualizar Familia
			</button>

			<div>
				<Modal
					isOpen={isModalOpen}
					onClose={closeModal}
					onConfirm={handleConfirm}
					title='Eliminar familia'
					content='Vas a eliminar esta familia. ¿Estás seguro de que quieres continuar?'
					cancelText='Cancelar'
					confirmText='Eliminar'
				/>
			</div>
		</>
	);
}
