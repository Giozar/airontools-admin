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

		return pathnames.map((part, index) => {
			fullPath += `/${part}`;
			const isLast = index === pathnames.length - 1;
			const isPrevLast = index === pathnames.length - 2;

			if (isLast && isId(part)) {
				return (
					<span
						key={part}
						className='breadcrumb__item breadcrumb__item--current'
					></span>
				);
			}
			if (isPrevLast && isId(pathnames[pathnames.length - 1])) {
				return (
					<span
						key={part}
						className='breadcrumb__item breadcrumb__item--current'
					>
						{getDisplayName(part)}
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
