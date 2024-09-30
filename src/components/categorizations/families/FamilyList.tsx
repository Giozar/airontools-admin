import DropdownMenu from '@components/commons/DropdownMenu';
import EditIcon from '@components/svg/EditIcon';
import TrashIcon from '@components/svg/TrashIcon';
import { useModal } from '@contexts/Modal/ModalContext';
import { handleOpenModal } from '@handlers/handleOpenModal';
import { useEditCategorization } from '@hooks/categorizations/useEditCategorization';
import useFamilyManagement from '@hooks/categorizations/useFamilyManagement';
import useFetchCategorization from '@hooks/categorizations/useFetchCategorization';
import { useEffect, useState } from 'react';

export default function FamilyList() {
	const [searchTerm, setSearchTerm] = useState('');
	const { handleEdit, handleDelete } = useFamilyManagement();
	const { handleDeleteFamily } = useEditCategorization();
	const { loading, filteredFamilies, handleSearch, setupdateListFlag } =
		useFetchCategorization();
	useEffect(() => {}, [filteredFamilies]);
	const { openModal } = useModal();

	if (loading) return <p>Cargando...</p>;

	return (
		<div>
			<h2 className='title'>Lista de familias</h2>
			<input
				type='text'
				placeholder='Buscar familias...'
				value={searchTerm}
				onChange={e => {
					setSearchTerm(e.target.value);
					handleSearch(e.target.value);
				}}
				className='input'
			/>

			<div className='grid'>
				{filteredFamilies.map(family => {
					return (
						<div key={family.id} className='card'>
							<div className='cardHeader'>
								<h2 className='cardTitle'>{family.name}</h2>
								<div>
									<button className='edit' onClick={() => handleEdit(family)}>
										<EditIcon />
									</button>
									<button
										className='delete'
										onClick={() =>
											handleOpenModal(
												family.id,
												family.name,
												() => {
													handleDelete(family.id || '', family.name);
													setupdateListFlag(prev => !prev);
												},
												openModal,
												true,
												true,
												true,
												true,
											)
										}
									>
										<TrashIcon />
									</button>
								</div>
							</div>
							<div className='cardContent'>
								<p>ID: {family.id}</p>
								{family.images[0] ? (
									<img src={family.images[0]} width={150} height={150} />
								) : (
									<p>No hay imagen disponible</p>
								)}
								<p>{family.description}</p>
								<hr></hr>
								{family.categories && (
									<DropdownMenu
										filteredCategories={family.categories}
										filteredSubcategories={family.subcategories}
										family={family}
									/>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
