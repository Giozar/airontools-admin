import ActionCard from '@components/commons/ActionCard';
import DropdownMenu from '@components/commons/DropdownMenu';
import EditIcon from '@components/svg/EditIcon';
import TrashIcon from '@components/svg/TrashIcon';
import { useModal } from '@contexts/Modal/ModalContext';

import useFamilyManagement from '@hooks/families/useFamilyManagement';
import useFetchCategorization from '@hooks/families/useFetchCategorization';
import '@pages/css/familyList.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { handleOpenModal } from './Edit/handleOpenModal';

function ListOfFamilies() {
	const [searchTerm, setSearchTerm] = useState('');
	const { handleEdit, handleDelete } = useFamilyManagement();
	const { loading, filteredFamilies, handleSearch, setupdateListFlag } =
		useFetchCategorization();
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

export default function CategorizationMenu() {
	const location = useLocation();
	return (
		<>
			<div className='options users'>
				<ActionCard
					title='Crear Familia'
					path={location.pathname + '/crear-familia'}
				/>
				<ActionCard
					title='Especificaciones'
					path={location.pathname + '/especificaciones'}
				/>
			</div>
			<ListOfFamilies />
		</>
	);
}
