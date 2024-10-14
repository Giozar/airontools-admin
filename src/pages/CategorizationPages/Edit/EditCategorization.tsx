import EditFamily from '@components/categorizations/edit/EditFamily';
import CategoryList from '@components/categorizations/edit/tables/EditCategoryTable';
import ActionSearchList from '@components/commons/ActionSearchList';
import { useEditCategorization } from '@hooks/categorizations/useEditCategorization';

export default function EditCategorization() {
	const { handleUpdateFamily } = useEditCategorization();

	return (
		<>
			<form className='create-family-form' onSubmit={handleUpdateFamily}>
				<EditFamily />
			</form>
			<ActionSearchList
				Actiontitle='Crear Categoría'
				ListTitle='Lista de categorías'
				path={'crear-categoria'}
				placeholder={'Buscar Categoría'}
				ListComponent={CategoryList}
			/>
		</>
	);
}
