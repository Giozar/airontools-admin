import React from 'react';
import './ErrorPage.css';

const ErrorPage: React.FC = () => {
	return (
		<div className='error-page'>
			<div className='error-icon'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='100'
					height='100'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
					className='icon icon-tabler icon-tabler-sad'
				>
					<path stroke='none' d='M0 0h24v24H0z' fill='none' />
					<circle cx='12' cy='12' r='9' />
					<path d='M15 15c-2 2 -4 2 -6 0' />
					<path d='M10 10l-0.5 -0.5' />
					<path d='M14 10l0.5 -0.5' />
				</svg>
			</div>
			<h1>Error</h1>
			<p>Revise la ruta, la página que busca no existe.</p>
		</div>
	);
};

export default ErrorPage;
