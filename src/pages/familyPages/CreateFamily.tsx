import { CategoryFrontend } from '@adapters/category.adapter';
import { SubcategoryFrontend } from '@adapters/subcategory.adapter';
import ErrorMessage from '@components/ErrorMessage';
import HeaderTitle from '@components/HeaderTitle';
import SuccessMessage from '@components/SuccessMessage';
import PlusIcon from '@components/svg/PlusIcon';
import TrashIcon from '@components/svg/TrashIcon';
import { AuthContext } from '@contexts/AuthContext';
import useCategoryCreate from '@hooks/useCategoryCreate';
import useFamilyCreate from '@hooks/useFamilyCreate';
import useSubcategoryCreate from '@hooks/useSubcategoryCreate';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import '@pages/css/createFamily.css';
import { useContext, useState } from 'react';

interface SubcategoryAux {
	categoryIndex: number;
	subcategory: SubcategoryFrontend;
}
function CreateFamilyForm() {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const authContext = useContext(AuthContext);
	const createdBy = authContext?.user?.name || 'user';
	const { errorLog, successLog, createFamily } = useFamilyCreate();
	const { createCategory } = useCategoryCreate();
	const { createSubategory } = useSubcategoryCreate();
	const [categories, setCategories] = useState<CategoryFrontend[]>([]);
	const [subcategories, setSubcategories] = useState<SubcategoryAux[]>([]);

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		await createFamily({
			name,
			description,
			createdBy,
			path: '',
		})
			.then(async familyId => {
				console.log('Family ID:', familyId);
				const createdCategoryPromises = categories.map(async category => {
					return await createCategory({
						...category,
						familyId,
						createdBy,
					});
				});
				return Promise.all(createdCategoryPromises);
			})
			.then(createdCategories => {
				console.log('Created categories:', createdCategories);
				console.log();
				const createdSubcategoryPromises = subcategories.map(
					async subcategory => {
						return await createSubategory({
							...subcategory.subcategory,
							familyId: createdCategories[subcategory.categoryIndex].familyId,
							categoryId: createdCategories[subcategory.categoryIndex]._id,
						});
					},
				);
				return Promise.all(createdSubcategoryPromises);
			})
			.then(createdSubcategories => {
				console.log('Created subcategories:', createdSubcategories);
			})
			.then(() => {
				setName('');
				setDescription('');
			})
			.catch(error => {
				console.error('Error:', error);
			});

		console.log('Form submitted with:', { name, description, categories });
	};

	const addCategoryInput = () => {
		setCategories([
			...categories,
			{
				name: '',
				description: '',
				createdBy,
				path: '',
				familyId: '',
			},
		]);
	};

	const addSubcategoryInput = (categoryIndex: number) => {
		const newSubcategory: SubcategoryFrontend = {
			name: '',
			description: '',
			createdBy,
			path: '',
			familyId: '',
			categoryId: '',
		};

		setSubcategories([
			...subcategories,
			{
				categoryIndex,
				subcategory: newSubcategory,
			},
		]);
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

	const handleSubcategoryNameChange = (index: number, newName: string) => {
		const updatedSubcategories = [...subcategories];
		updatedSubcategories[index] = {
			...updatedSubcategories[index],
			subcategory: {
				...updatedSubcategories[index].subcategory,
				name: newName,
			},
		};
		setSubcategories(updatedSubcategories);
	};

	const handleSubcategoryDescriptionChange = (
		index: number,
		newDescription: string,
	) => {
		const updatedSubcategories = [...subcategories];
		updatedSubcategories[index] = {
			...updatedSubcategories[index],
			subcategory: {
				...updatedSubcategories[index].subcategory,
				description: newDescription,
			},
		};
		setSubcategories(updatedSubcategories);
	};

	const removeCategoryInput = (categoryIndex: number) => {
		const updatedCategories = [...categories];
		updatedCategories.splice(categoryIndex, 1);
		setCategories(updatedCategories);
	};
	const removeSubcategoryInput = (index: number) => {
		const updatedSubcategories = subcategories.filter((_, i) => i !== index);
		setSubcategories(updatedSubcategories);
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
				/>
				<label htmlFor='addCategory'>Categorías:</label>

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

							{subcategories
								.filter(
									subcategory => subcategory.categoryIndex === categoryIndex,
								)
								.map((subcategory, subcategoryIndex) => (
									<div key={subcategoryIndex} className='categories'>
										<div className='info'>
											<input
												type='text'
												placeholder={`Subcategoría ${subcategoryIndex + 1} Nombre`}
												value={subcategory.subcategory.name}
												onChange={e =>
													handleSubcategoryNameChange(
														subcategories.indexOf(subcategory),
														e.target.value,
													)
												}
												required
											/>
											<textarea
												placeholder={`Subcategoría ${subcategoryIndex + 1} Descripción (opcional)`}
												value={subcategory.subcategory.description}
												onChange={e =>
													handleSubcategoryDescriptionChange(
														subcategories.indexOf(subcategory),
														e.target.value,
													)
												}
											/>
										</div>
										<button
											type='button'
											className='delete'
											onClick={() => removeSubcategoryInput(subcategoryIndex)}
										>
											<TrashIcon />
										</button>
									</div>
								))}
							<button
								type='button'
								className='add'
								onClick={() => addSubcategoryInput(categoryIndex)}
							>
								<PlusIcon />
								Añadir subcategoría
							</button>
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
				<button type='button' className='add' onClick={addCategoryInput}>
					<PlusIcon />
					Añadir categoría
				</button>

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
