import ErrorMessage from '@components/commons/ErrorMessage';
import SuccessMessage from '@components/commons/SuccessMessage';
import useSubcategoryCreate from '@hooks/subcategories/useSubcategoryCreate';
import { SubcategoryDataToSend } from '@interfaces/subcategory.interface';
import React, { useState } from 'react';
import SubcategoryForm from './SubcategoryForm';

interface CreateSubcategoryProps {
	createdBy: string;
	family: string;
	category: string;
	update: () => void;
}

const CreateSubcategory: React.FC<CreateSubcategoryProps> = ({
	createdBy,
	family,
	category,
	update,
}) => {
	const { errorLog, successLog, createSubcategory } = useSubcategoryCreate();
	const [newSubcategories, setNewSubcategories] = useState<
		SubcategoryDataToSend[]
	>([]);

	const handleCreateSubcategory = async (
		subcategory: SubcategoryDataToSend,
	) => {
		try {
			await createSubcategory({ ...subcategory });
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
			<SubcategoryForm
				subcategories={newSubcategories}
				setSubcategories={setNewSubcategories}
				onSave={handleCreateSubcategory}
				onDelete={handleDelete}
			/>
		</div>
	);
};

export default CreateSubcategory;
