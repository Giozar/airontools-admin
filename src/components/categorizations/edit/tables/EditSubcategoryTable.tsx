import SubcategoryInfoModal from '@components/categorizations/modals/SubcategoryModal';
import TableComponent from '@components/commons/DynamicTable';
import EditIcon from '@components/svg/EditIcon';
import EyeIcon from '@components/svg/EyeIcon';
import NoImageIcon from '@components/svg/NoImageIcon';
import TrashIcon from '@components/svg/TrashIcon';
import { useCategoryCreateContext } from '@contexts/categorization/CategoryContext';
import { useFamilyCreateContext } from '@contexts/categorization/FamilyContext';
import { useSubcategoryCreateContext } from '@contexts/categorization/SubcategoryContext';
import { useModal } from '@contexts/Modal/ModalContext';
import { handleOpenModal } from '@handlers/handleOpenModal';
import { useEditCategorization } from '@hooks/categorizations/useEditCategorization';
import { SubcategoryCreateContextProps } from '@interfaces/subcategory.interface';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function SubcategoryList() {
	const navigate = useNavigate();
	const {
		subcategoryInstances,
		removeSubcategoryInstance,
		getSubcategoryInstance,
	} = useSubcategoryCreateContext();
	const { handleDeleteSubcategory } = useEditCategorization();
	const { name: familyName } = useFamilyCreateContext();
	const { getCategoryInstance } = useCategoryCreateContext();

	const { openModal } = useModal();
	const { categoryId } = useParams();
	const [subcategoryModal, setSubcategoryModal] = useState<{
		subcategory: SubcategoryCreateContextProps | null;
		open: boolean;
	}>({
		subcategory: null,
		open: false,
	});
	const handleConfirm = (subcategoryId: string, key: string) => {
		handleDeleteSubcategory(subcategoryId);
		removeSubcategoryInstance(key);
	};
	if (!categoryId) return null;
	const categoryName = getCategoryInstance(categoryId)?.name || '';

	const tableData = {
		headers: [
			'ID',
			'Nombre',
			'Descripción',
			'Imagen',
			'Ver',
			'Editar',
			'Borrar',
		],
		rows: Object.keys(subcategoryInstances).map(key => {
			const subcategory = getSubcategoryInstance(key);
			if (!subcategory || subcategory.mode !== 'edit') return []; // Devolver un arreglo vacío en lugar de null
			if (subcategory.category !== categoryId) return [];
			const imageUrl = subcategory.rawImage
				? URL.createObjectURL(subcategory.rawImage)
				: !subcategory.imageToDelete
					? subcategory.image
					: '';

			return [
				subcategory.id,
				subcategory.name,
				subcategory.description || '---',
				imageUrl ? (
					<img
						key={'image' + key}
						src={imageUrl}
						alt={subcategory.name}
						style={{ width: '100px', height: 'auto' }}
					/>
				) : (
					<NoImageIcon />
				),
				<button
					className='table__button table__button--view'
					key={`view-${subcategory.id}`}
					type='button'
					onClick={() => setSubcategoryModal({ subcategory, open: true })}
				>
					<EyeIcon />
				</button>,
				<button
					className='table__button table__button--edit'
					key={`edit-${subcategory.id}`}
					type='button'
					onClick={() => {
						navigate(`editar-subcategoria/${subcategory.id}`);
					}}
				>
					<EditIcon />
				</button>,
				<button
					key={'button' + key}
					type='button'
					onClick={() => {
						handleOpenModal(
							subcategory.id || '',
							'Subcategoría',
							() => handleConfirm(subcategory.id, key),
							openModal,
							false,
							false,
							true,
							true,
							'bySubcategory',
						);
					}}
					className='category-item__delete-button'
				>
					<TrashIcon />
				</button>,
			];
		}),
	};

	return (
		<>
			<SubcategoryInfoModal
				isOpen={subcategoryModal.open}
				onClose={() => setSubcategoryModal({ subcategory: null, open: false })}
				familyName={familyName}
				categoryName={categoryName}
				subcategory={subcategoryModal.subcategory}
			/>
			<TableComponent data={tableData} />
		</>
	);
}
