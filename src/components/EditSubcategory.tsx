import { SubcategoryFrontend } from '@adapters/subcategory.adapter';
import useSubcategoryManagement from '@hooks/useSubcategoryManagement';
import useSubcategoryUpdate from '@hooks/useSubcategoryUpdate';
import DeletionModal from './DeletionModal';
import Editables from './Editables';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';
import TrashIcon from './svg/TrashIcon';

function EditSubcategory({
	subcategories,
	setSubcategories,
	update,
}: {
	subcategories: SubcategoryFrontend[];
	setSubcategories: (subcategories: SubcategoryFrontend[]) => void;
	update: () => void;
}) {
	const {
		showDeletionModalFor,
		setShowDeletionModalFor,
		deletionMessage,
		handleCloseModal,
		handleDelete,
	} = useSubcategoryManagement();
	const { errorLogSubcategory, successLogSubcategory, updateSubategory } =
		useSubcategoryUpdate();

	const handleUpdateSubcategory = async (subcategory: SubcategoryFrontend) => {
		try {
			await updateSubategory({
				...subcategory,
			});
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const handleSubcategoryNameChange = (
		value: string,
		categoryIndex: number,
	) => {
		const updatedSubcategories = [...subcategories];
		updatedSubcategories[categoryIndex - 1].name = value;
		setSubcategories(updatedSubcategories);
	};

	const handleSubcategoryDescriptionChange = (
		value: string,
		categoryIndex: number,
	) => {
		const updatedSubcategories = [...subcategories];
		updatedSubcategories[categoryIndex - 1].description = value;
		setSubcategories(updatedSubcategories);
	};

	return (
		<>
			{successLogSubcategory.isSuccess && (
				<SuccessMessage message={successLogSubcategory.message} />
			)}
			{errorLogSubcategory.isError && (
				<ErrorMessage message={errorLogSubcategory.message} />
			)}
			<div id='subcategoriesList'>
				{subcategories.map((subcategory, subcategoryIndex) => (
					<div key={subcategoryIndex} className='category'>
						{showDeletionModalFor === subcategory.id && (
							<DeletionModal
								id={subcategory.id}
								name={subcategory.name}
								onClose={() => handleCloseModal()}
								onCloseDelete={update}
								onDelete={() =>
									handleDelete(subcategory.id || '', subcategory.name)
								}
								message={deletionMessage}
							/>
						)}
						<button
							className='delete'
							onClick={() => setShowDeletionModalFor(subcategory.id || '')}
						>
							<TrashIcon />
						</button>
						<h2>Subcategoría: {subcategory.name} </h2>
						<Editables
							what='Nombre'
							valueOf={subcategory.name}
							type='input'
							whichOne={subcategoryIndex + 1}
							onUpdateOne={handleSubcategoryNameChange}
						/>
						<Editables
							what='Descripción'
							valueOf={subcategory.description}
							type='textarea'
							whichOne={subcategoryIndex + 1}
							onUpdateOne={handleSubcategoryDescriptionChange}
						/>
						<button
							className='save'
							onClick={() => handleUpdateSubcategory(subcategory)}
						>
							Guardar Cambios
						</button>
					</div>
				))}
			</div>
		</>
	);
}
export default EditSubcategory;
