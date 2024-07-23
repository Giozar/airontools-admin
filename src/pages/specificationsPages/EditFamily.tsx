import { CategoryFrontend } from '@adapters/category.adapter';
import { FamilyFrontend } from '@adapters/family.adapter';
import Editables from '@components/Editables';
import ErrorMessage from '@components/ErrorMessage';
import HeaderTitle from '@components/HeaderTitle';
import SubcategoryModal from '@components/SubcategoryModal';
import SuccessMessage from '@components/SuccessMessage';
import TrashIcon from '@components/svg/TrashIcon';
import useCategoryUpdate from '@hooks/useCategoryUpdate';
import useFamilyUpdate from '@hooks/useFamilyUpdate';
import useFetchCategoriesFromFamily from '@hooks/useFetchCategoriesFromFamily';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import '@pages/css/editFamily.css';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function EditFamilyForm({ familyToEdit }: { familyToEdit: FamilyFrontend }) {
	// Datos recuperados y que se pueden modificar
	const [name, setName] = useState(familyToEdit.name);
	const [description, setDescription] = useState(familyToEdit.description);
	const familyId = familyToEdit.id;
	// Datos para actualizar
	const { errorLogFamily, successLogFamily, updateFamily } = useFamilyUpdate();
	const { errorLogCategory, successLogCategory, updateCategory } =
		useCategoryUpdate();

	/* METODOS PARA RECUPERAR DATOS */
	const { categories, setCategories, fetchCategories } =
		useFetchCategoriesFromFamily();

	useEffect(() => {
		if (familyId) {
			fetchCategories(familyId);
		}
	}, [familyId]);
	/* METODOS PARA MANEJAR LOS CAMBIOS DENTRO DEL 'FORMULARIO' */
	const handleNameUpdate = (newValue: string) => {
		setName(newValue);
	};

	const handleDescriptionUpdate = (newValue: string) => {
		setDescription(newValue);
	};
	const handleCategoryNameChange = (value: string, categoryIndex: number) => {
		const updatedCategories = [...categories];
		updatedCategories[categoryIndex - 1].name = value;
		setCategories(updatedCategories);
	};

	const handleCategoryDescriptionChange = (
		value: string,
		categoryIndex: number,
	) => {
		const updatedCategories = [...categories];
		updatedCategories[categoryIndex - 1].description = value;
		setCategories(updatedCategories);
	};
	/* METODOS PARA ACTUALIZAR */
	const handleUpdateFamily = async () => {
		try {
			if (
				name === familyToEdit.name &&
				description === familyToEdit.description
			)
				return;
			await updateFamily({
				...familyToEdit,
				name,
				description,
			});
			console.log('Form submitted with:', { name, description, categories });
		} catch (error) {
			console.error('Error:', error);
		}
	};
	const handleUpdateCategory = async (category: CategoryFrontend) => {
		try {
			await updateCategory({
				...category,
			});
			console.log('Form submitted with:', { name, description, categories });
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div>
			<div className='familyedit'>
				{successLogFamily.isSuccess && (
					<SuccessMessage message={successLogFamily.message} />
				)}
				{errorLogFamily.isError && (
					<ErrorMessage message={errorLogFamily.message} />
				)}
				<button className='delete'>
					<TrashIcon />
				</button>
				<h2>Editando la Familia: {name}</h2>
				<Editables
					what='Nombre'
					valueOf={name}
					type='input'
					onUpdate={handleNameUpdate}
				/>
				<Editables
					what='Descripción'
					valueOf={description}
					type='textarea'
					onUpdate={handleDescriptionUpdate}
				/>
				<button className='save' onClick={handleUpdateFamily}>
					Guardar Cambios
				</button>
			</div>
			<div className='categoryedit'>
				{categories.map((category, categoryIndex) => (
					<div className='category' key={categoryIndex}>
						{successLogCategory.isSuccess && (
							<SuccessMessage message={successLogCategory.message} />
						)}
						{errorLogCategory.isError && (
							<ErrorMessage message={errorLogCategory.message} />
						)}
						<button className='delete'>
							<TrashIcon />
						</button>
						<h2>Categoría: {category.name} </h2>
						<Editables
							what='Nombre'
							valueOf={category.name}
							type='input'
							whichOne={categoryIndex + 1}
							onUpdateOne={handleCategoryNameChange}
						/>
						<Editables
							what='Descripción'
							valueOf={category.description}
							type='textarea'
							whichOne={categoryIndex + 1}
							onUpdateOne={handleCategoryDescriptionChange}
						/>
						<SubcategoryModal
							categoryId={category.id || ''}
							categoryName={category.name || ''}
						/>
						<button
							className='save'
							onClick={() => handleUpdateCategory(category)}
						>
							Guardar Cambios
						</button>
					</div>
				))}
				;
			</div>
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
