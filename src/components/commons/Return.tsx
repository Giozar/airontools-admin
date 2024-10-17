import '@components/css/Return.css';
import ReturnIcon from '@components/svg/ReturnIcon';
import { Link, useLocation } from 'react-router-dom';

function Return() {
	const location = useLocation();
	const pathnames = location.pathname.split('/').filter(x => x); // Obtener partes de la ruta y filtrar vacíos
	const isId = (part: string) => /[a-f0-9]{24}/.test(part); // Verifica si el part es un ID

	const getDisplayName = (part: string) =>
		part.includes('-') ? part.split('-').join(' ') : part;

	const getPart = (index: number) => {
		return isId(pathnames[index]) ? pathnames[index - 1] : pathnames[index];
	};

	const renderReturn = () => {
		let fullPath = '';
		const lastIndex = pathnames.length - 1;
		fullPath = location.pathname
			.replace(pathnames[lastIndex], '') // quita el ultimo elemento
			.replace(/\/+$/, ''); // quita los // del final de la url

		if (isId(pathnames[lastIndex])) {
			fullPath = fullPath
				.replace(pathnames[lastIndex - 1], '') // quita el penultimo elemento
				.replace(/\/+$/, ''); // quita los // del final de la url
		}

		const part = getPart(
			isId(pathnames[lastIndex]) ? lastIndex - 2 : lastIndex - 1,
		);

		if (!part) return null;

		return (
			<Link to={fullPath} className='return__link' key={fullPath}>
				<ReturnIcon />
				Regresar a {getDisplayName(part)}
			</Link>
		);
	};

	return <div className='return'>{renderReturn()}</div>;
}

export default Return;
