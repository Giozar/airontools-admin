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

		const lastIndex = pathnames.length - 1;
		const element01 = location.pathname
			.replace(pathnames[lastIndex], '')
			.replace(/\/{2}$/, '');

		if (isId(pathnames[lastIndex])) {
			const element = element01
				.replace(pathnames[lastIndex - 1], '')
				.replace(/\/{2}$/, '');
			console.log('😀' + element);
		} else {
			console.log('😎' + element01);
		}

		return pathnames.map((part, index) => {
			fullPath += `/${part}`;
			const isLast = isId(part)
				? index === pathnames.length - 3
				: index === pathnames.length - 2;
			const nextPart = pathnames[index + 1];

			// Comprobación si el siguiente es un ID
			if (nextPart && isId(nextPart)) {
				prevPart = part;
				return null;
			}
			if (isLast) {
				return (
					<Link to={fullPath} className='return__link' key={fullPath}>
						<ReturnIcon />
						Regresar a {getDisplayName(prevPart)}
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
