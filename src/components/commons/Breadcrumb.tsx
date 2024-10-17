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
	const pathnames = location.pathname.split('/').filter(Boolean); // Filtra partes vacías

	const isId = (part: string) => /[a-f0-9]{24}/.test(part); // Verifica si el part es un ID

	const getDisplayName = (part: string) =>
		part.includes('-') ? part.split('-').join(' ') : part;

	const renderBreadcrumbs = () => {
		let fullPath = '';
		let prevPart = '';

		return pathnames.map((part, index) => {
			fullPath += `/${part}`;
			const isLast = index === pathnames.length - 1;
			const nextPart = pathnames[index + 1];

			// Comprobación si el siguiente es un ID
			if (nextPart && isId(nextPart)) {
				prevPart = part;
				return <></>;
			} else if (isId(part)) {
				if (isLast) {
					return (
						<span
							key={part}
							className='breadcrumb__item breadcrumb__item--current'
						>
							{getDisplayName(prevPart)}
						</span>
					);
				}
				return (
					<span key={part} className='breadcrumb__item'>
						<Link to={fullPath} className='breadcrumb__link'>
							{getDisplayName(prevPart)}
						</Link>
						<span className='breadcrumb__separator'>{separator}</span>
					</span>
				);
			}

			if (isLast) {
				return (
					<span
						key={part}
						className='breadcrumb__item breadcrumb__item--current'
					>
						{getDisplayName(part)}
					</span>
				);
			}

			return (
				<span key={part} className='breadcrumb__item'>
					<Link to={fullPath} className='breadcrumb__link'>
						{getDisplayName(part)}
					</Link>
					<span className='breadcrumb__separator'>{separator}</span>
				</span>
			);
		});
	};

	return <div className='breadcrumb'>{renderBreadcrumbs()}</div>;
}

export default Breadcrumb;
