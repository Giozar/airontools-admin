import ErrorMessage from '@components/ErrorMessage';
import HeaderTitle from '@components/HeaderTitle';
import SuccessMessage from '@components/SuccessMessage';
import PlusIcon from '@components/svg/PlusIcon';
import TrashIcon from '@components/svg/TrashIcon';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import '@pages/css/createFamily.css';
import { AuthContext } from '@src/apps/App';
import useFamilyCreate from '@src/hooks/useFamilyCreate';
import { useContext, useState } from 'react';

interface Subcategory {
	name: string;
	description: string;
}
interface Category {
	name: string;
	description: string;
	subcategories: Subcategory[];
}

function CreateFamilyForm() {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const authContext = useContext(AuthContext);
	const createdBy = authContext?.user?.name || 'user';
	const { errorLog, successLog, createFamily } = useFamilyCreate();
	const [categories, setCategories] = useState<Category[]>([]);

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		await createFamily({ name, description, createdBy });
		console.log('Form submitted with:', { name, description, categories });
	};

	const addCategoryInput = () => {
		setCategories([
			...categories,
			{
				name: '',
				description: '',
				subcategories: [],
			},
		]);
	};

	const addSubcategoryInput = (categoryIndex: number) => {
		const updatedCategories = [...categories];
		updatedCategories[categoryIndex].subcategories.push({
			name: '',
			description: '',
		});
		setCategories(updatedCategories);
	};

	const handleCategoryNameChange = (categoryIndex: number, value: string) => {
		const updatedCategories = [...categories];
		updatedCategories[categoryIndex].name = value;
		setCategories(updatedCategories);
	};

	const handleCategoryDescriptionChange = (
		categoryIndex: number,
		value: string,
	) => {
		const updatedCategories = [...categories];
		updatedCategories[categoryIndex].description = value;
		setCategories(updatedCategories);
	};

	const handleSubcategoryNameChange = (
		categoryIndex: number,
		subcategoryIndex: number,
		value: string,
	) => {
		const updatedCategories = [...categories];
		updatedCategories[categoryIndex].subcategories[subcategoryIndex].name =
			value;
		setCategories(updatedCategories);
	};

	const handleSubcategoryDescriptionChange = (
		categoryIndex: number,
		subcategoryIndex: number,
		value: string,
	) => {
		const updatedCategories = [...categories];
		updatedCategories[categoryIndex].subcategories[
			subcategoryIndex
		].description = value;
		setCategories(updatedCategories);
	};

	const removeCategoryInput = (categoryIndex: number) => {
		const updatedCategories = [...categories];
		updatedCategories.splice(categoryIndex, 1);
		setCategories(updatedCategories);
	};

	const removeSubcategoryInput = (
		categoryIndex: number,
		subcategoryIndex: number,
	) => {
		const updatedCategories = [...categories];
		updatedCategories[categoryIndex].subcategories.splice(subcategoryIndex, 1);
		setCategories(updatedCategories);
	};

	return (
		<div className='createfamilyform'>
			{successLog.isSuccess && <SuccessMessage message={successLog.message} />}
			{errorLog.isError && <ErrorMessage message={errorLog.message} />}

			<form onSubmit={handleSubmit}>
				<h2>Nueva familia de herramientas</h2>
				<label htmlFor='name'>Nombre de familia:</label>
				<input
					id='name'
					type='text'
					placeholder='Introduce el nombre de la familia'
					value={name}
					onChange={e => setName(e.target.value)}
					required
				/>

				<label htmlFor='description'>Descripción:</label>
				<textarea
					id='description'
					placeholder='Introduce la descripción de la familia'
					value={description}
					onChange={e => setDescription(e.target.value)}
					required
				/>
				<label htmlFor='addCategory'>Categorías:</label>
				<button type='button' className='add' onClick={addCategoryInput}>
					<PlusIcon />
					Añadir categoría
				</button>
				{categories.map((category, categoryIndex) => (
					<div key={categoryIndex} className='categories'>
						<div className='info'>
							<input
								type='text'
								placeholder={`Categoría ${categoryIndex + 1}`}
								value={category.name}
								onChange={e =>
									handleCategoryNameChange(categoryIndex, e.target.value)
								}
								required
							/>
							<textarea
								placeholder={`Categoría ${categoryIndex + 1} Descripción (opcional)`}
								value={category.description}
								onChange={e =>
									handleCategoryDescriptionChange(categoryIndex, e.target.value)
								}
							/>
							<button
								type='button'
								className='add'
								onClick={() => addSubcategoryInput(categoryIndex)}
							>
								<PlusIcon />
								Añadir subcategoría
							</button>
							{category.subcategories.map((subcategory, subcategoryIndex) => (
								<div key={subcategoryIndex} className='categories'>
									<div className='info'>
										<input
											type='text'
											placeholder={`Subcategoría ${subcategoryIndex + 1} Nombre`}
											value={subcategory.name}
											onChange={e =>
												handleSubcategoryNameChange(
													categoryIndex,
													subcategoryIndex,
													e.target.value,
												)
											}
											required
										/>
										<textarea
											placeholder={`Subcategoría ${subcategoryIndex + 1} Descripción (opcional)`}
											value={subcategory.description}
											onChange={e =>
												handleSubcategoryDescriptionChange(
													categoryIndex,
													subcategoryIndex,
													e.target.value,
												)
											}
										/>
									</div>
									<button
										type='button'
										className='delete'
										onClick={() =>
											removeSubcategoryInput(categoryIndex, subcategoryIndex)
										}
									>
										<TrashIcon />
									</button>
								</div>
							))}
						</div>

						<button
							type='button'
							className='delete'
							onClick={() => removeCategoryInput(categoryIndex)}
						>
							<TrashIcon />
						</button>
					</div>
				))}

				<button type='submit'>Crear familia</button>
			</form>
		</div>
	);
}

function ContentMainPage() {
	return (
		<BasePage>
			<HeaderApp />
			<main>
				<HeaderTitle title='Categorización' />

				<CreateFamilyForm />
			</main>
		</BasePage>
	);
}

function CreateFamily() {
	return <ContentMainPage />;
}

export default CreateFamily;
