import { SubcategoryFrontend } from '@adapters/subcategory.adapter';

import useSubcategoryCreate from '@hooks/useSubcategoryCreate';
import { useState } from 'react';
import Editables from './Editables';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';
import TrashIcon from './svg/TrashIcon';

function CreateSubcategory({
	createdBy,
	familyId,
	categoryId,
	update,
}: {
	createdBy: string;
	familyId: string;
	categoryId: string;
	update: () => void;
}) {
	const { errorLog, successLog, createSubategory } = useSubcategoryCreate();
	const [newSubcategories, setNewSubcategories] = useState<
		SubcategoryFrontend[]
	>([]);

	const handleCreateSubcategory = async (subcategory: SubcategoryFrontend) => {
		try {
			await createSubategory({
				...subcategory,
			});
			handleDelete(subcategory);
			update();
		} catch (error) {
			console.error('Error:', error);
		}
	};
	const addSubcategory = () => {
		setNewSubcategories([
			...newSubcategories,
			{
				name: '',
				description: '',
				createdBy,
				path: '',
				familyId,
				categoryId,
			},
		]);
	};
	const handleSubcategoryNameChange = (
		value: string,
		categoryIndex: number,
	) => {
		const updatedSubcategories = [...newSubcategories];
		updatedSubcategories[categoryIndex - 1].name = value;
		setNewSubcategories(updatedSubcategories);
	};

	const handleSubcategoryDescriptionChange = (
		value: string,
		categoryIndex: number,
	) => {
		const updatedSubcategories = [...newSubcategories];
		updatedSubcategories[categoryIndex - 1].description = value;
		setNewSubcategories(updatedSubcategories);
	};
	const handleDelete = (subcategory: SubcategoryFrontend) => {
		setNewSubcategories(newSubcategories.filter(c => c !== subcategory));
	};
	return (
		<div className='categoryedit new'>
			<button onClick={addSubcategory}>Añadir subcategoría</button>
			{successLog.isSuccess && <SuccessMessage message={successLog.message} />}
			{errorLog.isError && <ErrorMessage message={errorLog.message} />}
			<div id='subcategoriesList'>
				{newSubcategories.map((subcategory, subcategoryIndex) => (
					<div key={subcategoryIndex} className='category'>
						<button
							className='delete'
							onClick={() => handleDelete(subcategory)}
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
							onClick={() => handleCreateSubcategory(subcategory)}
						>
							Crear subcategoría
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
export default CreateSubcategory;
