import '@pages/generalPages/LandingPage.css';
import logoAirontools from '@pages/generalPages/logos/Logo-AIRON-TOOLS-perfil.png';
import logoCoirmex from '@pages/generalPages/logos/coirmex logo-u2754.png';
import logoDesumex from '@pages/generalPages/logos/logo-desumex.png';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
const CompanyBox: React.FC<{
	name: string;
	color: string;
	logo: string;
	loginUrl: string;
}> = ({ name, color, logo, loginUrl }) => {
	const navigate = useNavigate();

	const handleLoginRedirect = (company: string) => {
		console.log(`Redireccionando a /login/${company}`);
		localStorage.setItem('selectedCompany', company);
		navigate(`/login/${company}`);
	};

	return (
		<>
			<button
				onClick={() => handleLoginRedirect(loginUrl)}
				className='companyBox'
				style={{ backgroundColor: color }}
			>
				<img className='logo' src={logo} />
				<h3>{name}</h3>
			</button>
			<Outlet />
		</>
	);
};

function LandingPage() {
	const companies = [
		{
			name: 'AironTools',
			color: '#131954',
			logo: logoAirontools,
			loginUrl: 'airontools',
		},
		{
			name: 'Desumex',
			color: '#006599',
			logo: logoDesumex,
			loginUrl: 'desumex',
		},
		{
			name: 'Coirmex',
			color: '#771d1d',
			logo: logoCoirmex,
			loginUrl: 'coirmex',
		},
	];
	useEffect(() => {
		document.body.className = 'landing-bg';
		return () => {
			document.body.className = '';
		};
	}, []);
	return (
		<div className={'landing-container'}>
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
