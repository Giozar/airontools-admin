import EditCategory from '@components/categorizations/edit/EditCategory';
import SubcategoryList from '@components/categorizations/edit/tables/EditSubcategoryTable';
import ActionSearchList from '@components/commons/ActionSearchList';

export default function EditCategoryPage() {
	return (
		<>
			<form className='create-family-form'>
				<EditCategory />
			</form>
			<ActionSearchList
				Actiontitle='Crear Subcategoría'
				ListTitle='Lista de subcategorías'
				path={'crear-subcategoria'}
				placeholder={'Buscar Subcategoría'}
				ListComponent={SubcategoryList}
			/>
		</>
	);
}
