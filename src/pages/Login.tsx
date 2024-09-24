import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './css/Login.css';

import ThemeToggleButton from '@components/ThemeToggle';
import EyeIcon from '@components/svg/EyeIcon';
import EyeOffIcon from '@components/svg/EyeOffIcon';
import { useAlert } from '@contexts/Alert/AlertContext';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { ErrorResponse } from '@interfaces/ErrorResponse';
import logoAiron from '@pages/generalPages/logos/Logo-AIRON-TOOLS-perfil.png';
import logoCoirmex from '@pages/generalPages/logos/coirmex logo-u2754.png';
import logoDesumex from '@pages/generalPages/logos/logo-desumex.png';
import { loginUserService } from '@services/users/loginUser.service';
import aironLogo from './Logo-Blanco.png'; // cambiar por otro el general

function HeaderLogin({ title }: { title: string }) {
	return (
		<header>
			<div className='header__group'>
				<img src={aironLogo} alt={`logo de ${title}`} className='logoimg' />
				<h1>
					¡Bienvenido a tu sistema de gestión de trabajo <span>{title}</span>!
				</h1>
				<ThemeToggleButton />
			</div>
		</header>
	);
}

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { showAlert } = useAlert();
	const { setUser, setAuth } = useAuthContext();
	const [showPassword, setShowPassword] = useState(false);
	const { company } = useParams();
	const [logo, setLogo] = useState('');
	const navigate = useNavigate();
	useEffect(() => {
		if (company) {
			setLogo(
				company === 'airontools'
					? logoAiron
					: company === 'desumex'
						? logoDesumex
						: company === 'coirmex'
							? logoCoirmex
							: '',
			);
		}
	}, []);
	useEffect(() => {
		document.body.className = `login-bg-${company}`;
		return () => {
			document.body.className = '';
		};
	}, [company]);

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const loggedUser = await loginUserService(email, password);
			if (loggedUser) {
				setAuth(true);
				setUser(loggedUser);
			}
			navigate('/home');
		} catch (err) {
			const error = err as ErrorResponse;
			showAlert(`No se pudo iniciar sesión ${error}`, 'error');
		}
	};
	/*
	if (authContext?.isAuthenticated) {
		return <Navigate to='/home' replace />;
	} */
	return (
		<>
			<HeaderLogin title={company || ''} />
			<div className='login'>
				<form onSubmit={handleLogin}>
					<img src={logo} alt={`logo de ${company}`} />
					<h2>Inicio de Sesión </h2>

					<label htmlFor='email'>Correo electrónico</label>
					<input
						id='email'
						type='email'
						placeholder='Introduce tu correo electrónico'
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
					<label htmlFor='password'>Contraseña</label>
					<div className='passwordInput'>
						<input
							id='password'
							type={showPassword ? 'text' : 'password'}
							placeholder='Introduce tu Contraseña'
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
						/>
						<button
							type='button'
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? <EyeOffIcon /> : <EyeIcon />}
						</button>
					</div>
					<p>¿No tienes una cuenta? Hable con el administrador.</p>
					<button type='submit'>Entrar</button>
				</form>
			</div>
		</>
	);
}

export default Login;
