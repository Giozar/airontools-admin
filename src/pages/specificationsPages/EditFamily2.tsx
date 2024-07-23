import { FamilyFrontend } from '@adapters/family.adapter';
import { SubcategoryFrontend } from '@adapters/subcategory.adapter';
import { AuthContext } from '@apps/App';
import ErrorMessage from '@components/ErrorMessage';
import HeaderTitle from '@components/HeaderTitle';
import SuccessMessage from '@components/SuccessMessage';
import PlusIcon from '@components/svg/PlusIcon';
import TrashIcon from '@components/svg/TrashIcon';
import useCategoryUpdate from '@hooks/useCategoryUpdate';
import useFamilyUpdate from '@hooks/useFamilyUpdate';
import useFetchCategoriesFromFamily from '@hooks/useFetchCategoriesFromFamily';
import useFetchSubcategoriesFromFamily from '@hooks/useFetchSubcategoriesFromFamily';
import useSubcategoryUpdate from '@hooks/useSubcategoryUpdate';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface SubcategoryAux {
	categoryIndex: number;
	subcategory: SubcategoryFrontend;
}

function EditFamilyForm({ familyToEdit }: { familyToEdit: FamilyFrontend }) {
	const [name, setName] = useState(familyToEdit.name);
	const [description, setDescription] = useState(familyToEdit.description);
	const authContext = useContext(AuthContext);
	const createdBy = authContext?.user?.name || 'user';
	const familyId = familyToEdit.id;
	const { errorLog, successLog, updateFamily } = useFamilyUpdate();
	const { updateCategory } = useCategoryUpdate();
	const { updateSubategory } = useSubcategoryUpdate();

	const { categories, setCategories, fetchCategories } =
		useFetchCategoriesFromFamily();
	const { subcategories, setSubcategories, fetchSubcategories } =
		useFetchSubcategoriesFromFamily();

	useEffect(() => {
		if (familyId) {
			fetchCategories(familyId);
		}
	}, [familyId]);

	useEffect(() => {
		if (categories.length > 0) {
			fetchSubcategories(categories[0].id || '');
		}
	}, [categories]);

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		try {
			e.preventDefault();

			// Update family
			await updateFamily({
				...familyToEdit,
				name,
				description,
				createdBy,
			});

			// Create category promises
			const createdCategoryPromises = categories.map(async category => {
				return updateCategory({ ...category, familyId: familyToEdit.id || '' });
			});

			// Wait for all category promises to resolve
			const createdCategories = await Promise.all(createdCategoryPromises);
			console.log('Created categories:', createdCategories);

			// Create subcategory promises
			const createdSubcategoryPromises = subcategories.map(
				async subcategory => {
					return updateSubategory({
						...subcategory,
					});
				},
			);

			// Wait for all subcategory promises to resolve
			const createdSubcategories = await Promise.all(
				createdSubcategoryPromises,
			);
			console.log('Created subcategories:', createdSubcategories);

			console.log('Form submitted with:', { name, description, categories });
		} catch (error) {
			console.error('Error:', error);
		}
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
				...newSubcategory,
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
			name: newName,
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
			description: newDescription,
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
				<h2>Actualizar familia de herramientas</h2>
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
								.filter(subcategory => subcategory.categoryId === category.id)
								.map((subcategory, subcategoryIndex) => (
									<div key={subcategoryIndex} className='categories'>
										<div className='info'>
											<input
												type='text'
												placeholder={`Subcategoría ${subcategoryIndex + 1} Nombre`}
												value={subcategory.name}
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
												value={subcategory.description}
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

				<button type='submit'>Actualizar familia</button>
			</form>
		</div>
	);
}

function ContentMainPage() {
	const location = useLocation();
	const { family } = location.state || {
		family: { id: 'N/A', name: 'Desconocido' },
	};
	return (
		<BasePage>
			<HeaderApp />
			<main>
				<HeaderTitle title='Editar Familia' />
				<EditFamilyForm familyToEdit={family} />
			</main>
		</BasePage>
	);
}
function CategorizationMenu() {
	return <ContentMainPage />;
}

export default CategorizationMenu;
