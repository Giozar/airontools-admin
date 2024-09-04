import Editables from '@components/commons/Editables';
import TrashIcon from '@components/svg/TrashIcon';
import { SubcategoryDataToSend } from '@interfaces/subcategory.interface';

interface SubcategoryFormProps {
	subcategories: SubcategoryDataToSend[];
	setSubcategories: (subcategories: SubcategoryDataToSend[]) => void;
	onSave: (subcategory: SubcategoryDataToSend) => void;
	onDelete?: (subcategory: SubcategoryDataToSend) => void;
	isEditing?: boolean;
}

const SubcategoryForm: React.FC<SubcategoryFormProps> = ({
	subcategories,
	setSubcategories,
	onSave,
	onDelete,
	isEditing = false,
}) => {
	const handleSubcategoryNameChange = (value: string, index: number) => {
		const updatedSubcategories = [...subcategories];
		updatedSubcategories[index].name = value;
		setSubcategories(updatedSubcategories);
	};

	const handleSubcategoryDescriptionChange = (value: string, index: number) => {
		const updatedSubcategories = [...subcategories];
		updatedSubcategories[index].description = value;
		setSubcategories(updatedSubcategories);
	};

	return (
		<div id='subcategoriesList' className='categoryedit'>
			{subcategories.map((subcategory, index) => (
				<div key={index} className='category'>
					{onDelete && (
						<button className='delete' onClick={() => onDelete(subcategory)}>
							<TrashIcon />
						</button>
					)}
					<h2>
						<span>Subcategoría</span> {subcategory.name}{' '}
					</h2>
					<Editables
						what='Nombre'
						valueOf={subcategory.name}
						type='input'
						whichOne={index + 1}
						onUpdateOne={value => handleSubcategoryNameChange(value, index)}
					/>
					<Editables
						what='Descripción'
						valueOf={subcategory.description || ''}
						type='textarea'
						whichOne={index + 1}
						onUpdateOne={value =>
							handleSubcategoryDescriptionChange(value, index)
						}
					/>
					<button className='save' onClick={() => onSave(subcategory)}>
						{isEditing ? 'Guardar Cambios' : 'Crear subcategoría'}
					</button>
					<hr />
				</div>
			))}
		</div>
	);
};

export default SubcategoryForm;
