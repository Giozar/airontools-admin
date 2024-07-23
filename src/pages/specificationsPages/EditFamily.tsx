import '@pages/css/editFamily.css';
import { CategoryFrontend } from '@src/adapters/category.adapter';
import { FamilyFrontend } from '@src/adapters/family.adapter';
import { SubcategoryFrontend } from '@src/adapters/subcategory.adapter';
import Editables from '@src/components/Editables';
import ErrorMessage from '@src/components/ErrorMessage';
import HeaderTitle from '@src/components/HeaderTitle';
import SuccessMessage from '@src/components/SuccessMessage';
import CloseIcon from '@src/components/svg/CloseIcon';
import TrashIcon from '@src/components/svg/TrashIcon';
import useCategoryUpdate from '@src/hooks/useCategoryUpdate';
import useFamilyUpdate from '@src/hooks/useFamilyUpdate';
import useFetchCategoriesFromFamily from '@src/hooks/useFetchCategoriesFromFamily';
import useFetchSubcategoriesFromFamily from '@src/hooks/useFetchSubcategoriesFromFamily';
import useSubcategoryUpdate from '@src/hooks/useSubcategoryUpdate';
import BasePage from '@src/layouts/BasePage';
import HeaderApp from '@src/layouts/HeaderApp';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function SubcategoryModal({
	categoryId,
	categoryName,
}: {
	categoryId: string;
	categoryName: string;
}) {
	const { subcategories, setSubcategories, fetchSubcategories } =
		useFetchSubcategoriesFromFamily();
	const { errorLogSubcategory, successLogSubcategory, updateSubategory } =
		useSubcategoryUpdate();

	useEffect(() => {
		fetchSubcategories(categoryId || '');
	}, []);

	const handleUpdateSubcategory = async (subcategory: SubcategoryFrontend) => {
		try {
			await updateSubategory({
				...subcategory,
			});
		} catch (error) {
			console.error('Error:', error);
		}
	};
	const [modalVisible, setModalVisible] = useState(false);

	const openModal = () => {
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	const addSubcategory = () => {
		// Add your logic to add a new subcategory here
		console.log('Adding new subcategory');
	};
	const handleSubcategoryNameChange = (
		value: string,
		categoryIndex: number,
	) => {
		const updatedCategories = [...subcategories];
		updatedCategories[categoryIndex - 1].name = value;
		setSubcategories(updatedCategories);
	};

	const handleSubcategoryDescriptionChange = (
		value: string,
		categoryIndex: number,
	) => {
		const updatedCategories = [...subcategories];
		updatedCategories[categoryIndex - 1].description = value;
		setSubcategories(updatedCategories);
	};
	return (
		<>
			{subcategories.length !== 0 && (
				<>
					<p>Subcategorias: </p>
					<ul>
						{subcategories.map(subcategory => (
							<li key={subcategory.id}>{subcategory.name}</li>
						))}
					</ul>
				</>
			)}

			<button onClick={openModal} className='edit'>
				Editar subcategorias
			</button>

			{modalVisible && (
				<div id='subcategoriesModal' className='modal'>
					<div className='modal-content'>
						<span className='close' onClick={closeModal}>
							<CloseIcon />
						</span>
						<h2 id='modalTitle'>Subcategorías de {categoryName} </h2>
						<p>({categoryId})</p>
						{successLogSubcategory.isSuccess && (
							<SuccessMessage message={successLogSubcategory.message} />
						)}
						{errorLogSubcategory.isError && (
							<ErrorMessage message={errorLogSubcategory.message} />
						)}
						<div id='subcategoriesList'>
							{subcategories.map((subcategory, subcategoryIndex) => (
								<div className='category'>
									<button className='delete'>
										<TrashIcon />
									</button>
									<h2>Subcategoría: {subcategory.name} </h2>
									<Editables
										what='Nombre'
										valueOf={subcategory.name}
										type='input'
										whichOne={subcategoryIndex + 1}
										onUpdateOne={handleSubcategoryNameChange}
									/>
									<Editables
										what='Descripción'
										valueOf={subcategory.description}
										type='textarea'
										whichOne={subcategoryIndex + 1}
										onUpdateOne={handleSubcategoryDescriptionChange}
									/>
									<button
										className='save'
										onClick={() => handleUpdateSubcategory(subcategory)}
									>
										Guardar Cambios
									</button>
								</div>
							))}
						</div>
						<button onClick={addSubcategory}>Añadir subcategoría</button>
					</div>
				</div>
			)}
		</>
	);
}

function EditFamilyForm({ familyToEdit }: { familyToEdit: FamilyFrontend }) {
	//Datos recuperados y que se pueden modificar
	const [name, setName] = useState(familyToEdit.name);
	const [description, setDescription] = useState(familyToEdit.description);
	const familyId = familyToEdit.id;
	//Datos para actualizar
	const { errorLogFamily, successLogFamily, updateFamily } = useFamilyUpdate();
	const { errorLogCategory, successLogCategory, updateCategory } =
		useCategoryUpdate();

	/*METODOS PARA RECUPERAR DATOS */
	const { categories, setCategories, fetchCategories } =
		useFetchCategoriesFromFamily();

	useEffect(() => {
		if (familyId) {
			fetchCategories(familyId);
		}
	}, [familyId]);
	/*METODOS PARA MANEJAR LOS CAMBIOS DENTRO DEL 'FORMULARIO' */
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
	/*METODOS PARA ACTUALIZAR */
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
