import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useFamilyCreateContext } from '@contexts/categorization/FamilyContext';
import { useModal } from '@contexts/Modal/ModalContext';
import { useEditCategorization } from '@hooks/families/useEditCategorization';
import { handleOpenModal } from '../../../handlers/handleOpenModal';
import './EditFamily.css';
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
		<div className='family__container'>
			<div className='family__container__header'>
				<h2 className='family__container__title'>
					Familia: {familyToCreate.name}
				</h2>
				<button
					type='button'
					className='family__container__delete-button'
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
			<div className='family__columns'>
				<div className='family__columns-left'>
					<TextInput
						id={'family'}
						label={'Nombre de familia:'}
						value={familyToCreate.name}
						placeholder={'Familia 1'}
						onChange={e => familyToCreate.setName(e.target.value)}
						required={true}
						className='family__container__text-input'
					/>
					<br></br>
					<TextAreaInput
						id={'description'}
						label={'Descripción de familia:'}
						value={familyToCreate.description}
						placeholder={'Introduce la descripción de la familia...'}
						onChange={e => familyToCreate.setDescription(e.target.value)}
						rows={6}
						className='family__container__text-area-input'
					/>
					<button
						type='button'
						onClick={handleUpdateFamily}
						className='family__container__update-button'
					>
						Actualizar Familia
					</button>
				</div>
				<div className='family__columns-right'>
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
				</div>
			</div>
		</div>
	);
}
