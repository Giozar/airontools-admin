import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useFamilyCreateContext } from '@contexts/categorization/FamilyContext';
import '@pages/css/createFamily.css';

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
