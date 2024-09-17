import FormHeader from '@components/commons/form/FormHeader';
import { useEditCategorization } from '@hooks/families/useEditCategorization';
import '@pages/css/createFamily.css';
import EditCategoriesSubcategories from './EditCategoriesSubcategories';
import EditFamily from './EditFamily';

export function CreateFamilyForm() {
	const { handleUpdateCategorization } = useEditCategorization();

	return (
		<form onSubmit={handleUpdateCategorization}>
			<FormHeader
				action='Editar Categorización'
				onSubmit={handleUpdateCategorization}
			/>
			<EditFamily />
			<EditCategoriesSubcategories />
		</form>
	);
}

export default function CreateCategorization() {
	return <CreateFamilyForm />;
}
