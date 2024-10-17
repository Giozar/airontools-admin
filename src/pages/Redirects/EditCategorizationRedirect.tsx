import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditCategorizationRedirect() {
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/home/productos/categorizacion');
	}, [navigate]);

	return null;
}
