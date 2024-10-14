import TableComponent from '@components/commons/DynamicTable';
import EditIcon from '@components/svg/EditIcon';
import EyeIcon from '@components/svg/EyeIcon';
import TrashIcon from '@components/svg/TrashIcon';
import { useCategoryCreateContext } from '@contexts/categorization/CategoryContext';
import { useSubcategoryCreateContext } from '@contexts/categorization/SubcategoryContext';
import { useModal } from '@contexts/Modal/ModalContext';
import { handleOpenModal } from '@handlers/handleOpenModal';
import { useEditCategorization } from '@hooks/categorizations/useEditCategorization';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SubcategoryList() {
	const navigate = useNavigate();
	const {
		subcategoryInstances,
		removeSubcategoryInstance,
		getSubcategoryInstance,
	} = useSubcategoryCreateContext();
	const { getCategoryInstance } = useCategoryCreateContext();
	const { handleDeleteSubcategory } = useEditCategorization();
	const { openModal } = useModal();

	const handleConfirm = (subcategoryId: string, key: string) => {
		handleDeleteSubcategory(subcategoryId);
		removeSubcategoryInstance(key);
	};
	const [categoryKey, setCategoryKey] = useState<string | null>(null);

	useEffect(() => {
		const storedKey = localStorage.getItem('categoryToEdit');
		setCategoryKey(storedKey);
	}, []);
	if (!categoryKey) return null;
	const category = getCategoryInstance(categoryKey);

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
			if (subcategory.category !== category?.id) return [];
			const imageUrl = subcategory.rawImage
				? URL.createObjectURL(subcategory.rawImage)
				: !subcategory.imageToDelete
					? subcategory.image
					: '';

			return [
				subcategory.id,
				subcategory.name,
				subcategory.description || '---',
				<img
					src={imageUrl}
					alt={subcategory.name}
					style={{ width: '100px', height: 'auto' }}
				/>,
				<button
					className='table__button table__button--view'
					key={`view-${subcategory.id}`}
					type='button'
				>
					<EyeIcon />
				</button>,
				<button
					className='table__button table__button--edit'
					key={`edit-${subcategory.id}`}
					type='button'
					onClick={() => {
						navigate('editar-subcategoria');
						localStorage.setItem('subcategoryToEdit', key);
					}}
				>
					<EditIcon />
				</button>,
				<button
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

	return <TableComponent data={tableData} />;
}
