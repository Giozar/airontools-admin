import { useEditCategorization } from '@hooks/categorizations/useEditCategorization';

import './EditCategorization.css';
import EditCategory from './EditCategory';
import SubcategoryList from './EditSubcategoryTable';

export default function EditCategoryPage() {
	const { handleUpdateFamily } = useEditCategorization();

	return (
		<form className='create-family-form' onSubmit={handleUpdateFamily}>
			<EditCategory />
			<SubcategoryList />
		</form>
	);
}
