import '@components/css/return.css'; // Cambiar el nombre del archivo CSS
import ReturnIcon from '@components/svg/ReturnIcon';
import { Link, useLocation } from 'react-router-dom';

function Return() {
	const location = useLocation();
	const pathnames = location.pathname.split('/').filter(x => x); // Obtener partes de la ruta y filtrar vacíos

	const renderReturn = () => {
		let fullPath = '';
		return (
			<>
				{pathnames.map((part, index) => {
					fullPath += `/${part}`;
					const isLast = index === pathnames.length - 2;
					const displayName = part.includes('-')
						? part.split('-').join(' ')
						: part;

					if (isLast) {
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
