import { SpecsFrontend } from '@adapters/specifications.adapter';
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
	specifications,
	onUpdateSubcategoriesLength,
}: {
	familyId: string;
	createdBy: string;
	categoryId: string;
	categoryName: string;
	specifications: SpecsFrontend[];
	onUpdateSubcategoriesLength: (categoryId: string, length: number) => void;
}) {
	const [modalVisible, setModalVisible] = useState(false);
	const [update, setUpdate] = useState(false);
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [update]);

	const updatedSubcategories = () => {
		setUpdate(!update);
	};

	useEffect(() => {
		const categoryIds = Array.from(
			new Set(subcategories.map(subcategory => subcategory.categoryId)),
		);
		categoryIds.forEach(categoryId => {
			const length = subcategories.filter(
				subcategory => subcategory.categoryId === categoryId,
			).length;
			onUpdateSubcategoriesLength(categoryId, length);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [subcategories, update]);

	return (
		<>
			<div className='subcategories-container'>
				{subcategories.length !== 0 && (
					<>
						<p>Subcategorias:</p>
						<ul className='subcategories-list'>
							{subcategories.map(subcategory => (
								<li key={subcategory.id}>{subcategory.name}</li>
							))}
						</ul>
					</>
				)}

				<button onClick={openModal} className='edit'>
					Editar subcategorias
				</button>
			</div>

			{modalVisible && (
				<div id='subcategoriesModal' className='modal'>
					<div className='modal-content'>
						<span className='close' onClick={closeModal}>
							<CloseIcon />
						</span>
						<h2 id='modalTitle'>
							<span>Subcategorías</span> {categoryName}
						</h2>
						<p>({categoryId})</p>
						<EditSubcategory
							subcategories={subcategories}
							setSubcategories={setSubcategories}
							update={updatedSubcategories}
							specifications={specifications}
						/>
						<CreateSubcategory
							createdBy={createdBy}
							familyId={familyId}
							categoryId={categoryId}
							update={updatedSubcategories}
						/>
					</div>
				</div>
			)}
		</>
	);
}
export default SubcategoryModal;
