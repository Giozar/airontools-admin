import useFetchSubcategoriesFromFamily from '@hooks/useFetchSubcategoriesFromFamily';
import { useEffect, useState } from 'react';
import CreateSubcategory from './CreateSubcategory';
import EditSubcategory from './EditSubcategory';
import CloseIcon from './svg/CloseIcon';

function SubcategoryModal({
	familyId,
	createdBy,
	categoryId,
	categoryName,
}: {
	familyId: string;
	createdBy: string;
	categoryId: string;
	categoryName: string;
}) {
	const [modalVisible, setModalVisible] = useState(false);

	const openModal = () => {
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	const { subcategories, setSubcategories, fetchSubcategories } =
		useFetchSubcategoriesFromFamily();
	useEffect(() => {
		fetchSubcategories(categoryId || '');
	}, []);

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
						<EditSubcategory
							subcategories={subcategories}
							setSubcategories={setSubcategories}
						/>
						<CreateSubcategory
							createdBy={createdBy}
							familyId={familyId}
							categoryId={categoryId}
						/>
					</div>
				</div>
			)}
		</>
	);
}
export default SubcategoryModal;
