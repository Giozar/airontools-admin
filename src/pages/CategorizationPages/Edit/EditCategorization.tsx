import { useEditCategorization } from '@hooks/categorizations/useEditCategorization';

import EditCreateToggle from '@components/commons/EditCreateToggle';
import CreateCategories from '@pages/CategorizationPages/Create/CreateCategory';
import EditCategories from './EditCategories';
import './EditCategorization.css';
import EditFamily from './EditFamily';

export default function EditCategorization() {
	const { handleUpdateFamily } = useEditCategorization();

	return (
		<form className='create-family-form' onSubmit={handleUpdateFamily}>
			<EditFamily />
			<EditCreateToggle
				name={'Categorías'}
				EditComponent={<EditCategories />}
				CreateComponent={<CreateCategories createButton={true} />}
			/>
		</form>
	);
}
