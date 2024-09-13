import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useFamilyCreateContext } from '@contexts/categorization/FamilyContext';
import '@pages/css/createFamily.css';

export default function CreateFamily() {
	const { ...familyToCreate } = useFamilyCreateContext();

	return (
		<>
			<h2>Familia</h2>
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
						: ''
				}
				setFilePreview={familyToCreate.setRawImage}
			/>
		</>
	);
}
