import DynamicInputAreaList from '@components/commons/DynamicInputAreaList';
import DynamicSelectInputAreaList from '@components/commons/DynamicSelectInputAreaList';
import ErrorMessage from '@components/commons/ErrorMessage';
import ImageUploader from '@components/commons/ImageUploader';
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

	const handleImageUpload = async (productId: string) => {
		return await handleFileUpload('images', productId, 'images');
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
				categories.map(async category => {
					return createCategory({
						name: category.name,
						description: category.description,
						family: familyId,
						createdBy,
					});
				}),
			);

			console.log('Categorías creadas:', createdCategories);

			// Crear subcategorías
			const createdSubcategories = await Promise.all(
				subcategories.map(async subcategory => {
					const category = createdCategories.find(
						cat => subcategory.selected === cat.name,
					);
					return createSubcategory({
						name: subcategory.name,
						description: subcategory.description,
						family: category.family._id,
						category: category._id,
						createdBy,
					});
				}),
			);

			console.log('Subcategorías creadas:', createdSubcategories);
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

			<div className='form-header'>
				<h2>Familia</h2>
				<button type='submit'>Crear familia</button>
			</div>

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
					<ImageUploader
						title='Foto de familia:'
						filePreviews={filePreviews}
						onFileSelect={handleFileSelect}
						onRemoveFile={handleRemoveFile}
					/>
				</div>
			</div>
			<div>
				<h2>Categorías</h2>
				<DynamicInputAreaList
					name='categoría'
					onChange={handleCategoriesChange}
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
