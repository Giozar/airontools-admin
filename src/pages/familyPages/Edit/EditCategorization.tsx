import { useEditCategorization } from '@hooks/families/useEditCategorization';

import EditCreateToggle from '@components/commons/EditCreateToggle';
import CreateCategories from '../Create/CreateCategory';
import './EditCategorization.css';
import EditCategories from './EditCategory';
import EditFamily from './EditFamily';

export function CreateFamilyForm() {
	const { handleUpdateCategorization } = useEditCategorization();

	return (
		<form className='create-family-form' onSubmit={handleUpdateCategorization}>
			<EditFamily />
			<EditCreateToggle
				name={'Categorías'}
				EditComponent={<EditCategories />}
				CreateComponent={<CreateCategories createButton={true} />}
			/>
		</form>
	);
}

export default function CreateCategorization() {
	return <CreateFamilyForm />;
}
