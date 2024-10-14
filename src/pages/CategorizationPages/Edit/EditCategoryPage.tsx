import EditCategory from '@components/categorizations/edit/EditCategory';
import SubcategoryList from '@components/categorizations/edit/tables/EditSubcategoryTable';
import { useEditCategorization } from '@hooks/categorizations/useEditCategorization';

export default function EditCategoryPage() {
	const { handleUpdateFamily } = useEditCategorization();

	return (
		<>
			<form className='create-family-form' onSubmit={handleUpdateFamily}>
				<EditCategory />
			</form>
			<SubcategoryList />
		</>
	);
}
