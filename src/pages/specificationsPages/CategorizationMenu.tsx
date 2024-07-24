import ActionCard from '@components/ActionCard';
import DeletionModal from '@components/DeletionModal';
import ErrorMessage from '@components/ErrorMessage';
import HeaderTitle from '@components/HeaderTitle';
import EditIcon from '@components/svg/EditIcon';
import TrashIcon from '@components/svg/TrashIcon';
import useFamilyManagement from '@hooks/useFamilyManagement';
import useFetchCategories from '@hooks/useFetchCategories';
import useFetchFamilies from '@hooks/useFetchFamilies';
import useFetchSubcategories from '@hooks/useFetchSubcategories';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import '@pages/css/familyList.css';
import { useState } from 'react';
// import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
/* interface Subcategory {
	name: string;
}

interface Category {
	name: string;
	subcategories?: Subcategory[];
}

interface Family {
	name: string;
	description: string;
	categories: Category[];
}

const SubcategoryList: React.FC<{ subcategories: Subcategory[] }> = ({
	subcategories,
}) => (
	<ul className='subcategory'>
		{subcategories.map((subcategory, index) => (
			<li key={index}>{subcategory.name}</li>
		))}
	</ul>
);

const CategoryList: React.FC<{ categories: Category[] }> = ({ categories }) => (
	<ul className='category'>
		{categories.map((category, index) => (
			<li key={index}>
				{category.name}
				{category.subcategories && (
					<SubcategoryList subcategories={category.subcategories} />
				)}
			</li>
		))}
	</ul>
);

const FamilyList: React.FC<{ families: Family[] }> = ({ families }) => (
	<div className='familylist'>
		{families.map((family, index) => (
			<div key={index} className='family'>
				<h2>{family.name}</h2>
				<p>{family.description}</p>
				{family.categories.map((category, catIndex) => (
					<div key={catIndex}>
						<Collapsible
							trigger={isOpen => (
								<div>
									<span>{isOpen ? '▼' : '▶'}</span>
									<span>{category.name}</span>
								</div>
							)}
						>
							<CategoryList categories={category.subcategories || []} />
						</Collapsible>
					</div>
				))}
			</div>
		))}
	</div>
);
type CollapsibleProps = {
	trigger: (isOpen: boolean) => React.ReactNode;
	children: React.ReactNode;
};

function Collapsible({ trigger, children }: CollapsibleProps) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<div onClick={() => setIsOpen(!isOpen)}>{trigger(isOpen)}</div>
			{isOpen && <div>{children}</div>}
		</>
	);
}
*/

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
	if (loading) {
		return <p>Cargando...</p>;
	}

	if (errorLog.isError) {
		return <ErrorMessage message={errorLog.message} />;
	}

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
				{filteredFamilies.map(family => (
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
								onCloseDelete={() => handleCloseModalDeletion(family.id || '')}
								onDelete={() => handleDelete(family.id || '', family.name)}
								message={deletionMessage}
							/>
						)}
						{filteredCategories.filter(
							category => category.familyId === family.id,
						).length !== 0 && <span>Categorias:</span>}

						<ul>
							{filteredCategories
								.filter(category => category.familyId === family.id)
								.map(category => (
									<li key={category.id}>
										{category.name}
										{filteredSubcategories.filter(
											subcategory => subcategory.categoryId === category.id,
										).length !== 0 && <span>Subcategorias:</span>}

										<ul>
											{filteredSubcategories
												.filter(
													subcategory => subcategory.categoryId === category.id,
												)
												.map(subcategory => (
													<li key={subcategory.id}>{subcategory.name}</li>
												))}
										</ul>
									</li>
								))}
						</ul>
					</li>
				))}
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
