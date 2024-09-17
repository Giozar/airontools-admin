import ErrorMessage from '@components/commons/ErrorMessage';
import FormHeader from '@components/commons/form/FormHeader';
import SuccessMessage from '@components/commons/SuccessMessage';
import { useCreateCategorization } from '@hooks/families/useCreateCategorization';
import '@pages/css/createFamily.css';
import CreateCategories from './CreateCategory';
import CreateFamily from './CreateFamily';
import CreateSubcategories from './CreateSubcategoryWithSelect';

export function CreateFamilyForm() {
	const { handleSubmit, errorLog, successLog } = useCreateCategorization();

	return (
		<form className='createfamilyform' onSubmit={handleSubmit}>
			{successLog.isSuccess && <SuccessMessage message={successLog.message} />}
			{errorLog.isError && <ErrorMessage message={errorLog.message} />}

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
