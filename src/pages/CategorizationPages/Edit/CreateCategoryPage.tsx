import { useEditCategorization } from '@hooks/categorizations/useEditCategorization';
import CreateCategories from '../Create/CreateCategory';

export default function CreateCategoryPage() {
	const { handleUpdateFamily } = useEditCategorization();

	return (
		<>
			<CreateCategories createButton={true} init={true} />
		</>
	);
}
