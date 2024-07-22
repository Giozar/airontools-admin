import HeaderTitle from '@components/HeaderTitle';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import { FamilyFrontend } from '@src/adapters/family.adapter';
import { AuthContext } from '@src/apps/App';
import ErrorMessage from '@src/components/ErrorMessage';
import SuccessMessage from '@src/components/SuccessMessage';
import PlusIcon from '@src/components/svg/PlusIcon';
import TrashIcon from '@src/components/svg/TrashIcon';
import useFamilyUpdate from '@src/hooks/useFamilyUpdate';
import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Subcategory {
	name: string;
	description: string;
}
interface Category {
	name: string;
	description: string;
	subcategories: Subcategory[];
}

function EditFamilyForm({ familyToEdit }: { familyToEdit: FamilyFrontend }) {
	const [name, setName] = useState(familyToEdit.name);
	const [description, setDescription] = useState(familyToEdit.description);
	const authContext = useContext(AuthContext);
	const createdBy = authContext?.user?.name || 'user';
	const { errorLog, successLog, updateFamily } = useFamilyUpdate();
	const [categories, setCategories] = useState<Category[]>([]);

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		await updateFamily({
			...familyToEdit,
			name,
			description,
			createdBy,
		});
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
				<h2>Modificar familia de herramientas</h2>
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

				<button type='submit'>Modificar familia</button>
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
