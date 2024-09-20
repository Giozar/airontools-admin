import '@components/css/breadcrumb.css';
import RightArrow from '@components/svg/RightArrow';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Breadcrumb({
	separator = <RightArrow />,
}: {
	separator?: React.ReactNode;
}) {
	const location = useLocation();
	const pathnames = location.pathname.split('/').filter(x => x); // Obtener las partes de la ruta y filtrar las partes vacías

	const renderBreadcrumbs = () => {
		let fullPath = '';
		return (
			<>
				{pathnames.map((part, index) => {
					fullPath += `/${part}`;
					const isLast = index === pathnames.length - 1;
					const displayName = part.includes('-')
						? part.split('-').join(' ')
						: part;

					if (isLast) {
						return (
							<span
								key={part}
								className='breadcrumb__item breadcrumb__item--current'
							>
								{displayName}
							</span>
						);
					}

					return (
						<span key={part} className='breadcrumb__item'>
							<Link to={fullPath} className='breadcrumb__link'>
								{displayName}
							</Link>
							<span className='breadcrumb__separator'>{separator}</span>
						</span>
					);
				})}
			</>
		);
	};

	return <div className='breadcrumb'>{renderBreadcrumbs()}</div>;
}

export default Breadcrumb;
