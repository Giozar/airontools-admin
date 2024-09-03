import ActionCard from '@components/commons/ActionCard';
import DeletionModal from '@components/commons/DeletionModal';
import DropdownMenu from '@components/commons/DropdownMenu';
import ErrorMessage from '@components/commons/ErrorMessage';
import EditIcon from '@components/svg/EditIcon';
import TrashIcon from '@components/svg/TrashIcon';

import useFetchCategories from '@hooks/categories/useFetchCategories';
import useFamilyManagement from '@hooks/families/useFamilyManagement';
import useFetchFamilies from '@hooks/families/useFetchFamilies';
import useFetchProducts from '@hooks/products/useFetchProducts';
import useFetchSpecifications from '@hooks/specifications/useFetchSpecifications';
import useFetchSubcategories from '@hooks/subcategories/useFetchSubcategories';
import BasePage from '@layouts/BasePage';
import '@pages/css/familyList.css';
import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ListOfFamilies() {
	const [searchTerm, setSearchTerm] = useState('');
	const {
		showDeletionModalFor,
		setShowDeletionModalFor,
		deletionMessage,
		handleEdit,
		handleCloseModal,
		handleDelete,
		updateListFlag,
	} = useFamilyManagement();

	const {
		loading,
		errorLog,
		setFamilies,
		filteredFamilies,
		setFilteredFamilies,
		handleSearch,
	} = useFetchFamilies(updateListFlag);

	const { filteredCategories } = useFetchCategories();
	const { filteredSubcategories } = useFetchSubcategories();
	const { filteredSpecifications } = useFetchSpecifications();
	const { filteredProducts } = useFetchProducts();

	const handleCloseModalDeletion = (familyId: string) => {
		setFamilies(prevFamilies =>
			prevFamilies.filter(family => family.id !== familyId),
		);
		setFilteredFamilies(prevFiltered =>
			prevFiltered.filter(family => family.id !== familyId),
		);
	};

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

			// console.log(filteredSpecifications);
			// console.log(specifications);

			const products = filteredProducts.filter(
				product => product.family._id == familyId,
			);

			return {
				categoriesLength: categories.length,
				subcategoriesLength: subcategories.length,
				specificationLength: specifications.length,
				productsLength: products.length,
			};
		};
	}, [filteredCategories, filteredSubcategories, filteredSpecifications]);

	if (loading) return <p>Cargando...</p>;
	if (errorLog.isError) return <ErrorMessage message={errorLog.message} />;

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
					const {
						categoriesLength,
						subcategoriesLength,
						specificationLength,
						productsLength,
					} = calcFamilyStats(family.id || '');
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
										onClick={() => setShowDeletionModalFor(family.id || '')}
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
								{showDeletionModalFor === family.id && (
									<DeletionModal
										id={family.id}
										name={family.name}
										onClose={handleCloseModal}
										onCloseDelete={() =>
											handleCloseModalDeletion(family.id || '')
										}
										onDelete={() => handleDelete(family.id || '', family.name)}
										message={deletionMessage}
										confirmationInfo={
											categoriesLength > 0 ||
											subcategoriesLength > 0 ||
											specificationLength > 0 ||
											productsLength > 0
												? `Al borrar esta familia se eliminarán ${categoriesLength > 0 ? categoriesLength + ' categorías, ' : ''}
												${subcategoriesLength > 0 ? subcategoriesLength + ' subcategorías, ' : ''} 
												${specificationLength > 0 ? specificationLength + ' especificaciones, ' : ''} 
												${
													productsLength > 0
														? productsLength +
															` productos, desligar y 
												reclasificar estos productos antes de proceder con la eliminación`
														: ''
												} `
												: null
										}
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

function ContentMainPage() {
	const location = useLocation();
	return (
		<BasePage title='Categorización'>
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
		</BasePage>
	);
}

function CategorizationMenu() {
	return <ContentMainPage />;
}

export default CategorizationMenu;
