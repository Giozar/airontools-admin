import React, { FormEvent } from 'react';

interface FormHeaderProps {
	action: string;
	onSubmit?: (e: FormEvent) => Promise<void>;
}

const FormHeader: React.FC<FormHeaderProps> = ({ action }) => {
	return (
		<div className='form-header'>
			<h2>{action}</h2>
		</div>
	);
};

export default FormHeader;
