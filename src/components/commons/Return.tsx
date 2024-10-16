import '@components/css/Return.css';
import ReturnIcon from '@components/svg/ReturnIcon';
import { Link, useLocation } from 'react-router-dom';

function Return() {
	const location = useLocation();
	const pathnames = location.pathname.split('/').filter(x => x); // Obtener partes de la ruta y filtrar vacíos
	const isId = (part: string) => /[a-f0-9]{24}/.test(part); // Verifica si el part es un ID

	const renderReturn = () => {
		let fullPath = '';
		return (
			<>
				{pathnames.map((part, index) => {
					fullPath += `/${part}`;
					const isLast = index === pathnames.length - 2;
					const isPrevLast = index === pathnames.length - 3;
					const displayName = part.includes('-')
						? part.split('-').join(' ')
						: part;
					if (isId(pathnames[pathnames.length - 1]) && isPrevLast) {
						return (
							<Link to={fullPath} className='return__link' key={fullPath}>
								<ReturnIcon />
								Regresar a {displayName}
							</Link>
						);
					}
					if (!isId(pathnames[pathnames.length - 1]) && isLast) {
						return (
							<Link to={fullPath} className='return__link' key={fullPath}>
								<ReturnIcon />
								Regresar a {displayName}
							</Link>
						);
					}
					return null;
				})}
			</>
		);
	};

	return <div className='return'>{renderReturn()}</div>;
}

export default Return;
