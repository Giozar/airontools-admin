import '@components/categorizations/css/EditFamily.css';
import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useFamilyCreateContext } from '@contexts/categorization/FamilyContext';
import { useModal } from '@contexts/Modal/ModalContext';
import { handleOpenModal } from '@handlers/handleOpenModal';
import { useEditCategorization } from '@hooks/categorizations/useEditCategorization';
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
	const { openModal } = useModal();
	return (
		<div className='family-item' key={familyToCreate.id}>
			<div className='family-item__header'>
				<h2 className='family-item__title'>Familia: {familyToCreate.name}</h2>
			</div>
			<div className='family__columns'>
				<div className='family__column-left'>
					<TextInput
						id='family'
						label='Nombre de familia:'
						value={familyToCreate.name}
						placeholder='Familia 1'
						onChange={e => familyToCreate.setName(e.target.value)}
						required
						className='family-item__text-input'
					/>
					<br />
					<TextAreaInput
						id='description'
						label='Descripción de familia:'
						value={familyToCreate.description}
						placeholder='Introduce la descripción de la familia...'
						onChange={e => familyToCreate.setDescription(e.target.value)}
						rows={6}
						className='family-item__text-area-input'
					/>
				</div>
				<div className='family__column-right'>
					<SingleImageChange
						title='Imagen de Familia:'
						filePreview={
							familyToCreate.rawImage
								? URL.createObjectURL(familyToCreate.rawImage)
								: !familyToCreate.imageToDelete
									? familyToCreate.image
									: ''
						}
						setFilePreview={file => familyToCreate.setRawImage(file)}
						setFileToDelete={familyToCreate.setImageToDelete}
					/>
				</div>
			</div>
			<div className='family__footer'>
				<button
					type='button'
					onClick={handleUpdateFamily}
					className='family-item__update-button'
				>
					Actualizar Familia
				</button>
				<button
					type='button'
					className='family-item__delete-button'
					onClick={() =>
						handleOpenModal(
							familyToCreate.id || '',
							'Familia',
							() => handleDeleteFamily(familyToCreate.id || ''),
							openModal,
							true,
							true,
							true,
							true,
						)
					}
				>
					Eliminar familia
				</button>
			</div>
		</div>
	);
}
