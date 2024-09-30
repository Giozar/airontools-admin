import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useFamilyCreateContext } from '@contexts/categorization/FamilyContext';
import '@pages/css/createFamily.css';
/**
 * Permite la creación y edición de una familia.
 *
 * Este componente proporciona una interfaz para introducir información sobre una familia. Incluye campos
 * para el nombre, descripción y una imagen asociada a la familia. Los datos se obtienen del contexto
 * de creación de la familia y se actualizan en tiempo real a medida que el usuario interactúa con los
 * campos del formulario.
 *
 * @returns {JSX.Element} - Un componente que muestra un formulario para crear o editar una familia,
 *   incluyendo campos para el nombre, descripción y una imagen, con funcionalidades para actualizar
 *   estos datos en el contexto de familia en la aplicación.
 */
export default function CreateFamily() {
	const { ...familyToCreate } = useFamilyCreateContext();

	return (
		<div className='family'>
			<h2 className='item-header'>Familia</h2>

			<TextInput
				className='item-name'
				id={'family'}
				label={'Nombre de familia:'}
				value={familyToCreate.name}
				placeholder={'Familia 1'}
				onChange={e => familyToCreate.setName(e.target.value)}
				required={true}
			/>
			<br></br>
			<TextAreaInput
				className='item-description'
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
						: familyToCreate.image || ''
				}
				setFilePreview={familyToCreate.setRawImage}
			/>
		</div>
	);
}
