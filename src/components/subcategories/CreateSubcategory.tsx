import Editables from '@components/commons/Editables';
import ErrorMessage from '@components/commons/ErrorMessage';
import SuccessMessage from '@components/commons/SuccessMessage';

import TrashIcon from '@components/svg/TrashIcon';
import useSubcategoryCreate from '@hooks/subcategories/useSubcategoryCreate';
import { SubcategoryDataToSend } from '@interfaces/subcategory.interface';
import { useState } from 'react';
function CreateSubcategory({
	createdBy,
	family,
	category,
	update,
}: {
	createdBy: string;
	family: string;
	category: string;
	update: () => void;
}) {
	const { errorLog, successLog, createSubcategory } = useSubcategoryCreate();
	const [newSubcategories, setNewSubcategories] = useState<
		SubcategoryDataToSend[]
	>([]);

	const handleCreateSubcategory = async (
		subcategory: SubcategoryDataToSend,
	) => {
		try {
			await createSubcategory({
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
				family,
				category,
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
	const handleDelete = (subcategory: SubcategoryDataToSend) => {
		setNewSubcategories(newSubcategories.filter(c => c !== subcategory));
	};
	return (
		<div>
			<button onClick={addSubcategory} className='add'>
				Añadir subcategoría
			</button>
			{successLog.isSuccess && <SuccessMessage message={successLog.message} />}
			{errorLog.isError && <ErrorMessage message={errorLog.message} />}
			<div id='subcategoriesList' className='categoryedit new'>
				{newSubcategories.map((subcategory, subcategoryIndex) => (
					<div key={subcategoryIndex} className='category'>
						<button
							className='delete'
							onClick={() => handleDelete(subcategory)}
						>
							<TrashIcon />
						</button>
						<h2>
							<span>Subcategoría</span> {subcategory.name}{' '}
						</h2>
						<Editables
							what='Nombre'
							valueOf={subcategory.name}
							type='input'
							whichOne={subcategoryIndex + 1}
							onUpdateOne={handleSubcategoryNameChange}
						/>
						<Editables
							what='Descripción'
							valueOf={subcategory.description || ''}
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