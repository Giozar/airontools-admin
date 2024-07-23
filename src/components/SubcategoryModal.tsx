import { SubcategoryFrontend } from '@adapters/subcategory.adapter';
import useFetchSubcategoriesFromFamily from '@hooks/useFetchSubcategoriesFromFamily';
import useSubcategoryUpdate from '@hooks/useSubcategoryUpdate';
import { useEffect, useState } from 'react';
import Editables from './Editables';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';
import CloseIcon from './svg/CloseIcon';
import TrashIcon from './svg/TrashIcon';

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
export default SubcategoryModal;
