import FormHeader from '@components/commons/form/FormHeader';
import { useCreateCategorization } from '@hooks/families/useCreateCategorization';
import '@pages/css/createFamily.css';
import CreateCategories from './CreateCategory';
import CreateFamily from './CreateFamily';
import CreateSubcategories from './CreateSubcategoryWithSelect';

export function CreateFamilyForm() {
	const { handleSubmit } = useCreateCategorization();

	return (
		<form className='createfamilyform' onSubmit={handleSubmit}>
			<FormHeader action='Crear Categorización' onSubmit={handleSubmit} />
			<CreateFamily />
			<CreateCategories />
			<CreateSubcategories />
		</form>
	);
}

export default function CreateCategorization() {
	return <CreateFamilyForm />;
}
