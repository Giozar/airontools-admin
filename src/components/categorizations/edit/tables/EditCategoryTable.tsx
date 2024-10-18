import TableComponent from '@components/commons/DynamicTable';
import EditIcon from '@components/svg/EditIcon';
import EyeIcon from '@components/svg/EyeIcon';
import NoImageIcon from '@components/svg/NoImageIcon';
import TrashIcon from '@components/svg/TrashIcon';
import { useCategoryCreateContext } from '@contexts/categorization/CategoryContext';
import { useModal } from '@contexts/Modal/ModalContext';
import { handleOpenModal } from '@handlers/handleOpenModal';
import { useEditCategorization } from '@hooks/categorizations/useEditCategorization';
import { useNavigate } from 'react-router-dom';

export default function CategoryList() {
	const navigate = useNavigate();
	const { categoryInstances, removeCategoryInstance, getCategoryInstance } =
		useCategoryCreateContext();
	const { handleDeleteCategory } = useEditCategorization();
	const { openModal } = useModal();
	const handleConfirm = (categoryId: string, key: string) => {
		handleDeleteCategory(categoryId);
		removeCategoryInstance(key);
	};

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

	return <TableComponent data={tableData} />;
}
