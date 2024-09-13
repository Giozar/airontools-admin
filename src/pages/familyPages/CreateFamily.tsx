import ErrorMessage from '@components/commons/ErrorMessage';
import FormHeader from '@components/commons/form/FormHeader';
import SingleImageChange from '@components/commons/SingleImageChange';
import SuccessMessage from '@components/commons/SuccessMessage';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { airontoolsAPI } from '@configs/api.config';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useCategoryCreateContext } from '@contexts/categorization/CategoryContext';
import { useFamilyCreateContext } from '@contexts/categorization/FamilyContext';
import useCategoryCreate from '@hooks/categories/useCategoryCreate';
import useFamilyCreate from '@hooks/families/useFamilyCreate';
import '@pages/css/createFamily.css';
import uploadFileService from '@services/files/fileUpload.service';
import axios from 'axios';
import CreateCategories from './CreateCategory';
import CreateSubcategories from './CreateSubcategory';

function CreateFamilyForm() {
	const { ...familyToCreate } = useFamilyCreateContext();
	const { errorLog, successLog, createFamily } = useFamilyCreate();
	const { createCategory } = useCategoryCreate();
	const { user } = useAuthContext();
	const { getAllCategoryInstances } = useCategoryCreateContext();
	const categoryInstances = getAllCategoryInstances();

	// Convierte las instancias en el formato necesario
	const formattedCategories = categoryInstances.map(category => ({
		family: category.family,
		name: category.name,
		description: category.description,
		image: category.rawImage,
	}));

	const handleRawImageUpload = async (rawImage: File, id: string) => {
		try {
			if (rawImage === null) return;
			const url = await uploadFileService(rawImage, 'image', id);
			console.log('Imagen subida ', url);
			return url;
		} catch (error) {
			console.error('No se pudo subir archivos:', rawImage, error);
		}
	};

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		try {
			if (!user) return;
			// Crear la familia
			console.log('Familia creada: ', {
				name: familyToCreate.name,
				description: familyToCreate.description,
				createdBy: familyToCreate.createdBy || user.id,
				path: '',
				images: [],
			});

			const familyId = await createFamily({
				name: familyToCreate.name,
				description: familyToCreate.description,
				createdBy: familyToCreate.createdBy || user.id,
				path: '',
				images: [],
			});
			console.log('ID de la familia:', familyId);
			// Actualizar familia para imagen
			const uploadedUrlImages = familyToCreate.rawImage
				? await handleRawImageUpload(familyToCreate.rawImage, familyId)
				: '';
			console.log('imagen subida: ', uploadedUrlImages);
			console.log(
				await axios.patch(airontoolsAPI + '/families/' + familyId, {
					images: [uploadedUrlImages],
				}),
			);

			console.log('Categorias creadas');
			for (const category of formattedCategories) {
				const categoryId = await createCategory({
					name: category.name,
					description: category.description,
					createdBy: user.id,
					images: [],
					family: familyId,
				});
				console.log('ID de la categoría:', categoryId._id);

				// Actualizar categoría con imagen

				const uploadedCategoryImageUrl = category.image
					? await handleRawImageUpload(category.image, categoryId._id)
					: '';
				console.log(
					'Imagen subida para la categoría:',
					uploadedCategoryImageUrl,
				);

				await axios.patch(`${airontoolsAPI}/categories/${categoryId._id}`, {
					images: [uploadedCategoryImageUrl],
				});
			}

			console.log('Proceso completado exitosamente');
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
				<CreateCategories />
			</div>
			<div>
				<CreateSubcategories />
			</div>
		</form>
	);
}

export default function CreateFamily() {
	return <CreateFamilyForm />;
}
