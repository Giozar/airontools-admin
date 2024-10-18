import CategoryInfoModal from '@components/categorizations/modals/CategoryInfoModal';
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
import { CategoryCreateContextProps } from '@interfaces/Category.interface';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CategoryList() {
	const navigate = useNavigate();
	const { categoryInstances, removeCategoryInstance, getCategoryInstance } =
		useCategoryCreateContext();
	const { handleDeleteCategory } = useEditCategorization();
	const { name: familyName } = useFamilyCreateContext();
	const { openModal } = useModal();
	const handleConfirm = (categoryId: string, key: string) => {
		handleDeleteCategory(categoryId);
		removeCategoryInstance(key);
	};
	const { getAllSubcategoryInstances } = useSubcategoryCreateContext();
	const subcategoryInstances = getAllSubcategoryInstances();

	const [categoryModal, setCategoryModal] = useState<{
		category: CategoryCreateContextProps | null;
		open: boolean;
	}>({
		category: null,
		open: false,
	});

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
		rows: Object.keys(categoryInstances).map(key => {
			const category = getCategoryInstance(key);
			if (!category || category.mode !== 'edit') return []; // Devolver un arreglo vacío en lugar de null

			const imageUrl = category.rawImage
				? URL.createObjectURL(category.rawImage)
				: !category.imageToDelete
					? category.image
					: '';

			return [
				category.id,
				category.name,
				category.description || '---',
				imageUrl ? (
					<img
						key={'image' + key}
						src={imageUrl}
						alt={category.name}
						style={{ width: '50px', height: 'auto' }}
					/>
				) : (
					<NoImageIcon />
				),
				<button
					className='table__button table__button--view'
					key={`view-${category.id}`}
					type='button'
					onClick={() => setCategoryModal({ category, open: true })}
				>
					<EyeIcon />
				</button>,
				<button
					className='table__button table__button--edit'
					key={`edit-${category.id}`}
					type='button'
					onClick={() => {
						navigate(`editar-categoria/${key}`);
					}}
				>
					<EditIcon />
				</button>,
				<button
					key={'button' + key}
					type='button'
					onClick={() => {
						handleOpenModal(
							category.id || '',
							'Categoría',
							() => handleConfirm(category.id, key),
							openModal,
							false,
							true,
							true,
							true,
							'byCategory',
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
			<CategoryInfoModal
				isOpen={categoryModal.open}
				onClose={() => setCategoryModal({ category: null, open: false })}
				category={categoryModal.category}
				familyName={familyName}
				subcategories={
					categoryModal.category
						? subcategoryInstances
								.map(subcat =>
									subcat.category === categoryModal.category?.id
										? subcat.name
										: null,
								)
								.filter((name): name is string => name !== null)
						: []
				}
			/>
			<TableComponent data={tableData} />
		</>
	);
}
