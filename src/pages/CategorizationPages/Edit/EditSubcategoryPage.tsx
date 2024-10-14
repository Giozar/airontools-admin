import EditSubcategory from '@components/categorizations/edit/EditSubcategory';
import { useEditCategorization } from '@hooks/categorizations/useEditCategorization';

export default function EditCategoryPage() {
	const { handleUpdateFamily } = useEditCategorization();

	return (
		<>
			<form className='create-family-form' onSubmit={handleUpdateFamily}>
				<EditSubcategory />
			</form>
		</>
	);
}
