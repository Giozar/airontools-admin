import ThemeToggleButton from '@components/ThemeToggle';
import { AuthContext } from '@contexts/AuthContext';
import '@pages/generalPages/LandingPage.css';
import logoAirontools from '@pages/generalPages/logos/Logo-AIRON-TOOLS-perfil.png';
import logoCoirmex from '@pages/generalPages/logos/coirmex logo-u2754.png';
import logoDesumex from '@pages/generalPages/logos/logo-desumex.png';
import '../../index.css';

import React, { useContext, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
const CompanyBox: React.FC<{
	name: string;
	color: string;
	logo: string;
	loginUrl: string;
}> = ({ name, color, logo, loginUrl }) => (
	<Link to={loginUrl}>
		<div className='companyBox' style={{ backgroundColor: color }}>
			<img className='logo' src={logo} />
			<h3>{name}</h3>
		</div>
	</Link>
);

function LandingPage() {
	const companies = [
		{
			name: 'AironTools',
			color: '#131954',
			logo: logoAirontools,
			loginUrl: '/login-airontools',
		},
		{
			name: 'Desumex',
			color: '#006599',
			logo: logoDesumex,
			loginUrl: '/login-desumex',
		},
		{
			name: 'Coirmex',
			color: '#771d1d',
			logo: logoCoirmex,
			loginUrl: '/login-coirmex',
		},
	];
	const authContext = useContext(AuthContext);

	useEffect(() => {
		document.body.className = 'landing-bg';
		return () => {
			document.body.className = '';
		};
	}, []);
	if (authContext?.isAuthenticated) {
		return <Navigate to={localStorage.getItem('location') || '/home'} />;
	}
	return (
		<div className={'landing-container'}>
			<ThemeToggleButton />
			<h1 className={'mainTitle'}>
				Sistema Integral de gestión para grupo industrial de herramientas
			</h1>
			<h2 className={'secondaryTitle'}>Selecciona tu empresa</h2>
			<div className={'companyGrid'}>
				{companies.map(company => (
					<CompanyBox key={company.name} {...company} />
				))}
			</div>
		</div>
	);
}

export default LandingPage;