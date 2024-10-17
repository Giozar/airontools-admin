import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditFamilyRedirect() {
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/home/productos/categorizacion');
	}, [navigate]);

	return null;
}
