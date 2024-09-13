import ErrorMessage from '@components/commons/ErrorMessage';
import FormHeader from '@components/commons/form/FormHeader';
import SingleImageChange from '@components/commons/SingleImageChange';
import SuccessMessage from '@components/commons/SuccessMessage';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useCategorizationCreateContext } from '@contexts/categorization/CategorizationContext';
import useFamilyCreate from '@hooks/families/useFamilyCreate';
import '@pages/css/createFamily.css';
import uploadFileService from '@services/files/fileUpload.service';

function CreateFamilyForm() {
	const { ...familyToCreate } = useCategorizationCreateContext();
	const { errorLog, successLog, createFamily } = useFamilyCreate();
	const { user } = useAuthContext();
	const handleImageUpload = async (familyId: string) => {
		try {
			if (familyToCreate.rawImage === null) return;
			const url = await uploadFileService(
				familyToCreate.rawImage,
				'image',
				familyId,
			);
			console.log(url);
		} catch (error) {
			console.error(
				'No se pudo subir archivos:',
				familyToCreate.rawImage,
				error,
			);
		}
	};
	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		try {
			// Crear la familia
			console.log({
				name: familyToCreate.name,
				description: familyToCreate.description,
				createdBy: user?.id,
				path: '',
				images: [],
			});
			/*const familyId = await createFamily({
				name: familyToCreate.name,
				description: familyToCreate.description,
				createdBy: familyToCreate.createdBy || 'xd',
				path: '',
				images: [],
			});
			console.log(familyId);
			// Actualizar familia para imagen
			const uploadedUrlImages = await handleImageUpload(familyId);
			console.log(uploadedUrlImages);
			await axios.patch(airontoolsAPI + '/families/' + familyId, {
				images: uploadedUrlImages,
			});

			console.log('ID de la familia:', familyId);*/
		} catch (error) {
			console.error(
				'Error al crear familias, categorías o subcategorías:',
				error,
			);
		}
	};

	return (
		<form className='createfamilyform' onSubmit={handleSubmit}>
			{successLog.isSuccess && <SuccessMessage message={successLog.message} />}
			{errorLog.isError && <ErrorMessage message={errorLog.message} />}
			<FormHeader action='Crear Familia' onSubmit={handleSubmit} />
			<h2>Familia</h2>
			<div className='form-content'>
				<div className='left-column'>
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
				</div>
				<div className='right-column'>
					<SingleImageChange
						title={`Imagen de Familia:`}
						filePreview={
							familyToCreate.rawImage
								? URL.createObjectURL(familyToCreate.rawImage)
								: ''
						}
						setFilePreview={familyToCreate.setRawImage}
					/>
				</div>
			</div>
			<div>
				<h2>Categorías</h2>

				{/*<DynamicImageInputAreaList
					name='categoría'
					onChange={handleCategoriesChange}
					filePreviews={filePreviews}
					onFileSelect={handleFileSelect}
					onRemoveFile={handleRemoveFile}
					type='category'
				/>*/}
			</div>
			<div>
				<h2>Subcategorías</h2>

				{/*<DynamicImageSelectInputAreaList
					name='subcategoría'
					selectOptions={
						categories.map(cat => ({ value: cat.name, label: cat.name })) || []
					}
					optionsName={'categoría:'}
					onChange={handleSubcategoriesChange}
					filePreviews={filePreviews}
					onFileSelect={handleFileSelect}
					onRemoveFile={handleRemoveFile}
					type='subcategory'
				/>*/}
			</div>
		</form>
	);
}

export default function CreateFamily() {
	return <CreateFamilyForm />;
}
