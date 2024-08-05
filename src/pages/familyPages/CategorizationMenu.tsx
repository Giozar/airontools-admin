import ActionCard from '@components/ActionCard';
import DeletionModal from '@components/DeletionModal';
import DropdownMenu from '@components/DropdownMenu';
import ErrorMessage from '@components/ErrorMessage';
import HeaderTitle from '@components/HeaderTitle';
import EditIcon from '@components/svg/EditIcon';
import TrashIcon from '@components/svg/TrashIcon';
import useFamilyManagement from '@hooks/useFamilyManagement';
import useFetchCategories from '@hooks/useFetchCategories';
import useFetchFamilies from '@hooks/useFetchFamilies';
import useFetchSubcategories from '@hooks/useFetchSubcategories';
import { SpecDataFrontend } from '@interfaces/Specifications.interface';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import '@pages/css/familyList.css';
import { getSpecifications } from '@services/specifications/getSpecifications.service';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ListofFamilies() {
	const [searchTerm, setSearchTerm] = useState<string>('');
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
		families,
		loading,
		errorLog,
		setFamilies,
		filteredFamilies,
		setFilteredFamilies,
		handleSearch,
	} = useFetchFamilies(updateListFlag);
	const { filteredCategories } = useFetchCategories();
	const { filteredSubcategories } = useFetchSubcategories();
	const handleCloseModalDeletion = (familyid: string) => {
		setFamilies(families.filter(family => family.id !== familyid));
		setFilteredFamilies(
			filteredFamilies.filter(family => family.id !== familyid),
		);
	};
	const [specifications, setSpecifications] = useState<SpecDataFrontend[]>([]);
	useEffect(() => {
		const fetchSpecifications = async () => {
			try {
				const specs = await getSpecifications();
				setSpecifications(specs);
				console.log(specs);
			} catch (error) {
				console.error(error);
			}
		};
		fetchSpecifications();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) {
		return <p>Cargando...</p>;
	}

	if (errorLog.isError) {
		return <ErrorMessage message={errorLog.message} />;
	}
	const calc = (familyId: string) => {
		const categories = filteredCategories.filter(
			category => category.family.id === familyId,
		);

		const subcategories = filteredSubcategories.filter(subcategory =>
			categories.some(category => category.id === subcategory.category._id),
		);
		const specificationsn = specifications.filter(
			specs => specs.family._id === familyId,
		);
		const categoriesLength = categories.length;
		const subcategoriesLength = subcategories.length;
		const specificationLength = specificationsn.length;
		return { categoriesLength, subcategoriesLength, specificationLength };
	};

	return (
		<div>
			<h2 className='listtitle'>Lista de familias</h2>
			<input
				type='text'
				placeholder='Buscar familias...'
				value={searchTerm}
				onChange={e => {
					handleSearch(e.target.value);
					setSearchTerm(e.target.value);
				}}
				className='search'
			/>

			<ul className='familylist'>
				{filteredFamilies.map(family => {
					const { categoriesLength, subcategoriesLength, specificationLength } =
						calc(family.id || '');
					return (
						<li key={family.id} className='family'>
							<div className='buttons family'>
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
							<h2>{family.name}</h2>
							<span className='id'>({family.id})</span>
							<span>Descripción:</span>
							<p>{family.description}</p>
							{showDeletionModalFor === family.id && (
								<DeletionModal
									id={family.id}
									name={family.name}
									onClose={() => handleCloseModal()}
									onCloseDelete={() =>
										handleCloseModalDeletion(family.id || '')
									}
									onDelete={() => handleDelete(family.id || '', family.name)}
									message={deletionMessage}
									confirmationInfo={
										categoriesLength > 0 && specificationLength > 0
											? `Al borrar esta familia se eliminarán ${categoriesLength} categorias, ${subcategoriesLength} subcategorías Y ${specificationLength} especificaciones`
											: categoriesLength > 0
												? `Al borrar esta familia se eliminarán ${categoriesLength} categorias y ${subcategoriesLength} subcategorías`
												: null
									}
								/>
							)}
							<DropdownMenu
								filteredCategories={filteredCategories}
								filteredSubcategories={filteredSubcategories}
								specifications={specifications}
								family={family}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

function ContentMainPage() {
	const location = useLocation();
	return (
		<BasePage>
			<HeaderApp />
			<main>
				<HeaderTitle title='Categorización' />
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
				<ListofFamilies />
			</main>
		</BasePage>
	);
}

function CategorizationMenu() {
	return <ContentMainPage />;
}

export default CategorizationMenu;
