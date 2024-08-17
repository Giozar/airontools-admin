import React, { FormEvent } from 'react';

interface FormHeaderProps {
	action: string;
	onSubmit: (e: FormEvent) => Promise<void>;
}

const FormHeader: React.FC<FormHeaderProps> = ({ action, onSubmit }) => {
	return (
		<div className='form-header'>
			<h2>{action}</h2>
			<button onClick={onSubmit} className='save'>
				{action}
			</button>
		</div>
	);
};

export default FormHeader;
