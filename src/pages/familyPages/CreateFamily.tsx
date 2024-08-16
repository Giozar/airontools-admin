import DynamicImageInputAreaList from '@components/commons/DynamicImageInputAreaList';
import DynamicSelectInputAreaList from '@components/commons/DynamicSelectInputAreaList';
import ErrorMessage from '@components/commons/ErrorMessage';
import ImageUploaderSingle from '@components/commons/ImageUploaderSingle';
import SuccessMessage from '@components/commons/SuccessMessage';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { AuthContext } from '@contexts/AuthContext';
import useCategoryCreate from '@hooks/categories/useCategoryCreate';
import useFamilyCreate from '@hooks/families/useFamilyCreate';
import useMultipleFileUpload from '@hooks/files/useMultipleFileUpload';
import useSubcategoryCreate from '@hooks/subcategories/useSubcategoryCreate';
import BasePage from '@layouts/BasePage';
import '@pages/css/createFamily.css';
import axios from 'axios';
import { useContext, useState } from 'react';

interface Category {
	name: string;
	description: string;
}
interface Subcategory {
	name: string;
	description: string;
	selected: string;
}
function CreateFamilyForm() {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const authContext = useContext(AuthContext);
	const createdBy = authContext?.user?.id || 'user';
	const [categories, setCategories] = useState<Category[]>([]);
	const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
	const { errorLog, successLog, createFamily } = useFamilyCreate();
	const { createCategory } = useCategoryCreate();
	const { createSubcategory } = useSubcategoryCreate();

	const { filePreviews, handleFileSelect, handleRemoveFile, handleFileUpload } =
		useMultipleFileUpload();

	const handleImageUpload = async (familyId: string) => {
		return await handleFileUpload('images.family', familyId, 'images.family');
	};
	const handleImageUploadCategory = async (
		categoryId: string,
		index: number,
	) => {
		return await handleFileUpload(
			'images.category' + '.' + index,
			categoryId,
			'images.category' + '.' + index,
		);
	};
	const handleImageUploadSubcategory = async (
		categoryId: string,
		index: number,
	) => {
		return await handleFileUpload(
			'images.subcategory' + '.' + index,
			categoryId,
			'images.subcategory' + '.' + index,
		);
	};
	const handleCategoriesChange = (
		categories: { name: string; description: string }[],
	) => {
		setCategories(categories);
	};
	const handleSubcategoriesChange = (
		subcategories: { name: string; description: string; selected: string }[],
	) => {
		setSubcategories(subcategories);
	};
	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		try {
			// Crear la familia
			const familyId = await createFamily({
				name,
				description,
				createdBy,
				path: '',
				images: [],
			});

			console.log('ID de la familia:', familyId);

			// Crear categorías
			const createdCategories = await Promise.all(
				categories.map(async (category, index) => {
					// Crea la categoría
					const createdCategory = await createCategory({
						name: category.name,
						description: category.description,
						family: familyId,
						createdBy,
					});

					// Subir imágenes asociadas a la categoría
					const categoryUploadedUrlImages = await handleImageUploadCategory(
						createdCategory._id,
						index + 1,
					);
					console.log(
						`Imágenes subidas para la categoría ${createdCategory._id}:`,
						categoryUploadedUrlImages,
					);

					// Actualiza la categoría con las URLs de las imágenes
					await axios.patch(
						`${import.meta.env.VITE_API_URL}/categories/${createdCategory._id}`,
						{ images: categoryUploadedUrlImages },
					);

					return createdCategory;
				}),
			);

			console.log('Categorías creadas y actualizadas:', createdCategories);

			// Crear subcategorías
			const createdSubcategories = await Promise.all(
				subcategories.map(async (subcategory, index) => {
					// Encuentra la categoría correspondiente a la subcategoría
					const category = createdCategories.find(
						cat => subcategory.selected === cat.name,
					);

					if (!category) {
						throw new Error(
							`Categoría no encontrada para la subcategoría ${subcategory.name}`,
						);
					}

					// Crea la subcategoría
					const createdSubcategory = await createSubcategory({
						name: subcategory.name,
						description: subcategory.description,
						family: category.family._id,
						category: category._id,
						createdBy,
					});

					// Subir imágenes asociadas a la subcategoría
					const subcategoryUploadedUrlImages =
						await handleImageUploadSubcategory(
							createdSubcategory._id,
							index + 1,
						);
					console.log(
						`Imágenes subidas para la subcategoría ${createdSubcategory._id}:`,
						subcategoryUploadedUrlImages,
					);

					// Actualiza la subcategoría con las URLs de las imágenes
					await axios.patch(
						`${import.meta.env.VITE_API_URL}/subcategories/${createdSubcategory._id}`,
						{ images: subcategoryUploadedUrlImages },
					);

					return createdSubcategory;
				}),
			);
			console.log('Subcategorías creadas:', createdSubcategories);
			// Actualizar familia para imagen
			const uploadedUrlImages = await handleImageUpload(familyId);
			console.log(uploadedUrlImages);
			await axios.patch(
				import.meta.env.VITE_API_URL + '/families/' + familyId,
				{ images: uploadedUrlImages },
			);
			setName('');
			setDescription('');
			setCategories([]);
			setSubcategories([]);
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

			<div
				className='form-header'
				style={{ justifyContent: 'flex-end', marginTop: '-50px' }}
			>
				<button
					onClick={handleSubmit}
					className='save'
					style={{ width: '250px' }}
				>
					Crear Familia
				</button>
			</div>
			<h2>Familia</h2>
			<div className='form-content'>
				<div className='left-column'>
					<TextInput
						id={'family'}
						label={'Nombre de familia:'}
						value={name}
						placeholder={'Familia 1'}
						onChange={e => setName(e.target.value)}
						required={true}
					/>
					<br></br>
					<TextAreaInput
						id={'description'}
						label={'Descripción de familia:'}
						value={description}
						placeholder={'Introduce la descripción de la familia...'}
						onChange={e => setDescription(e.target.value)}
						rows={6}
					/>
				</div>
				<div className='right-column'>
					<ImageUploaderSingle
						title={`Imagen de Familia:`}
						filePreviews={filePreviews}
						onFileSelect={handleFileSelect}
						onRemoveFile={handleRemoveFile}
						type={'family'}
					/>
				</div>
			</div>
			<div>
				<h2>Categorías</h2>

				<DynamicImageInputAreaList
					name='categoría'
					onChange={handleCategoriesChange}
					filePreviews={filePreviews}
					onFileSelect={handleFileSelect}
					onRemoveFile={handleRemoveFile}
					type='category'
				/>
			</div>
			<div>
				<h2>Subcategorías</h2>

				<DynamicSelectInputAreaList
					name='subcategoría'
					selectOptions={
						categories.map(cat => ({ value: cat.name, label: cat.name })) || []
					}
					optionsName={'categoría:'}
					onChange={handleSubcategoriesChange}
				/>
			</div>
		</form>
	);
}
function ContentMainPage() {
	return (
		<BasePage title='Crear familia'>
			<CreateFamilyForm />
		</BasePage>
	);
}

function CreateFamily() {
	return <ContentMainPage />;
}

export default CreateFamily;
