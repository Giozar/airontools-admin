import { useEditCategorization } from '@hooks/families/useEditCategorization';
import '@pages/css/createFamily.css';

import CreateCategories from '../Create/CreateCategory';
import EditCategories from './EditCategory';
import EditFamily from './EditFamily';

export function CreateFamilyForm() {
	const { handleUpdateCategorization } = useEditCategorization();

	return (
		<form onSubmit={handleUpdateCategorization}>
			<EditFamily />
			<EditCategories />
			<CreateCategories createButton={true} />
		</form>
	);
}

export default function CreateCategorization() {
	return <CreateFamilyForm />;
}
