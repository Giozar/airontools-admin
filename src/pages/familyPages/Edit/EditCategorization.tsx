import FormHeader from '@components/commons/form/FormHeader';
import { useEditCategorization } from '@hooks/families/useEditCategorization';
import '@pages/css/createFamily.css';
import EditCategories from './EditCategory';
import EditFamily from './EditFamily';
import EditSubcategories from './EditSubcategory';

export function CreateFamilyForm() {
	const { handleUpdateFamily } = useEditCategorization();

	return (
		<form onSubmit={handleUpdateFamily}>
			<FormHeader
				action='Editar Categorización'
				onSubmit={handleUpdateFamily}
			/>
			<EditFamily />
			<EditCategories />
			<EditSubcategories />
		</form>
	);
}

export default function CreateCategorization() {
	return <CreateFamilyForm />;
}
