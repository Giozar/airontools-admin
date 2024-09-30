import '@components/css/EditCreateToggle.css';
import { ReactElement, cloneElement, useState } from 'react';

interface ToggleProps {
	name: string;
	EditComponent: ReactElement;
	CreateComponent: ReactElement;
}

export default function EditCreateToggle({
	name,
	EditComponent,
	CreateComponent,
}: ToggleProps) {
	const [isEditing, setIsEditing] = useState(true);

	return (
		<>
			<div className='form__toggle-buttons'>
				<button
					type='button'
					className={`form__button ${isEditing ? 'form__button--active' : ''}`}
					onClick={() => setIsEditing(true)}
				>
					Editar {name}
				</button>
				<button
					type='button'
					className={`form__button ${!isEditing ? 'form__button--active' : ''}`}
					onClick={() => setIsEditing(false)}
				>
					Crear {name}
				</button>
			</div>

			{isEditing ? cloneElement(EditComponent) : cloneElement(CreateComponent)}
		</>
	);
}
