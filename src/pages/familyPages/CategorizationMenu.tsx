import ActionCard from '@components/commons/ActionCard';
import DropdownMenu from '@components/commons/DropdownMenu';
import EditIcon from '@components/svg/EditIcon';
import TrashIcon from '@components/svg/TrashIcon';
import { useModal } from '@contexts/Modal/ModalContext';

import useFetchCategories from '@hooks/categories/useFetchCategories';
import useFamilyManagement from '@hooks/families/useFamilyManagement';
import useFetchFamilies from '@hooks/families/useFetchFamilies';
import useFetchProducts from '@hooks/products/useFetchProducts';
import useFetchSpecifications from '@hooks/specifications/useFetchSpecifications';
import useFetchSubcategories from '@hooks/subcategories/useFetchSubcategories';
import '@pages/css/familyList.css';
import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ListOfFamilies() {
	const [searchTerm, setSearchTerm] = useState('');
	const { handleEdit, handleDelete } = useFamilyManagement();
	const { loading, filteredFamilies, handleSearch, setupdateListFlag } =
		useFetchFamilies();

	const { filteredCategories } = useFetchCategories();
	const { filteredSubcategories } = useFetchSubcategories();
	const { filteredSpecifications } = useFetchSpecifications();
	const { filteredProducts } = useFetchProducts();
	const { openModal } = useModal();

	const calcFamilyStats = useMemo(() => {
		return (familyId: string | undefined) => {
			const categories = filteredCategories.filter(
				category => category.family.id === familyId,
			);
			const subcategories = filteredSubcategories.filter(subcategory =>
				categories.some(category => category.id === subcategory.category._id),
			);
			const specifications = filteredSpecifications.filter(spec =>
				spec.families.some(fam => fam._id === familyId),
			);
			const products = filteredProducts.filter(
				product => product.family._id === familyId,
			);

			return {
				categoriesLength: categories.length,
				subcategoriesLength: subcategories.length,
				specificationLength: specifications.length,
				productsLength: products.length,
			};
		};
	}, [filteredCategories, filteredSubcategories, filteredSpecifications]);

	const handleOpenModal = (id: string, name: string) => {
		const {
			categoriesLength,
			subcategoriesLength,
			specificationLength,
			productsLength,
		} = calcFamilyStats(id || '');
		const suma =
			categoriesLength +
			subcategoriesLength +
			specificationLength +
			productsLength;
		openModal(
			'Eliminar la familia',
			`Vas a eliminar la familia ${name}. 
			Afectará a ${categoriesLength} categorias, ${subcategoriesLength} subcategorias,
			${specificationLength} especificaciones y ${productsLength} productos
			¿Estás seguro de que quieres continuar? `,
			() => {
				handleDelete(id, name), setupdateListFlag(prev => !prev);
			},
			suma !== 0,
			suma !== 0,
		);
	};

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
											handleOpenModal(family.id || '', family.name)
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
								<DropdownMenu
									filteredCategories={filteredCategories}
									filteredSubcategories={filteredSubcategories}
									filteredSpecifications={filteredSpecifications}
									family={family}
								/>
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
