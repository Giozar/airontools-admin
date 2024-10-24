import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditOrderRedirect() {
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/home/servicios/ver-orden');
	}, [navigate]);

	return null;
}
