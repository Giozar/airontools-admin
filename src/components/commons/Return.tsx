import '@components/css/Return.css';
import ReturnIcon from '@components/svg/ReturnIcon';
import { Link, useLocation } from 'react-router-dom';

function Return() {
	const location = useLocation();
	const pathnames = location.pathname.split('/').filter(x => x); // Obtener partes de la ruta y filtrar vacíos
	const isId = (part: string) => /[a-f0-9]{24}/.test(part); // Verifica si el part es un ID

	const getDisplayName = (part: string) =>
		part.includes('-') ? part.split('-').join(' ') : part;

	const renderReturn = () => {
		let fullPath = '';
		let prevPart = '';

		return pathnames.map((part, index) => {
			fullPath += `/${part}`;
			const isLast = index === pathnames.length - 3;
			const nextPart = pathnames[index + 1];

			// Comprobación si el siguiente es un ID
			if (nextPart && isId(nextPart)) {
				prevPart = part;
				return null;
			} else if (isId(part) && isLast) {
				return (
					<Link to={fullPath} className='return__link' key={fullPath}>
						<ReturnIcon />
						Regresar a {getDisplayName(prevPart)}
					</Link>
				);
			} else if (isLast) {
				return (
					<Link to={fullPath} className='return__link' key={fullPath}>
						<ReturnIcon />
						Regresar a {getDisplayName(part)}
					</Link>
				);
			} else {
				return null; // Cambiado de <></> a null para mejor claridad
			}
		});
	};

	return <div className='return'>{renderReturn()}</div>;
}

export default Return;
