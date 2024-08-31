import { transformUserDataFront } from '@adapters/user.adapter';
import { AuthContext } from '@contexts/AuthContext';
import useErrorHandling from '@hooks/common/useErrorHandling';
import axios, { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import './css/Login.css';
// eslint-disable-next-line import/no-absolute-path
import ThemeToggleButton from '@components/ThemeToggle';
import ErrorMessage from '@components/commons/ErrorMessage';
import EyeIcon from '@components/svg/EyeIcon';
import EyeOffIcon from '@components/svg/EyeOffIcon';
import { airontoolsAPI } from '@configs/api.config';
import { UserDataBackend } from '@interfaces/User.interface';
import logoAiron from '@pages/generalPages/logos/Logo-AIRON-TOOLS-perfil.png';
import logoCoirmex from '@pages/generalPages/logos/coirmex logo-u2754.png';
import logoDesumex from '@pages/generalPages/logos/logo-desumex.png';
import aironLogo from './Logo-Blanco.png'; //cambiar por otro el general
interface LoginResponse {
	token: string;
	user: UserDataBackend;
	exp: number;
	iat: number;
}

function HeaderLogin({ title }: { title: string }) {
	return (
		<header>
			<img src={aironLogo} alt={`logo de ${title}`} className='logoimg' />
			<h1>
				¡Bienvenido a tu sistema de gestión de trabajo <span>{title}</span>!
			</h1>
			<ThemeToggleButton />
		</header>
	);
}

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { errorLog, showError } = useErrorHandling();
	const authContext = useContext(AuthContext);
	const [showPassword, setShowPassword] = useState(false);
	const { company } = useParams();
	const [logo, setLogo] = useState('');
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
	}, []);

	useEffect(() => {
		const token = localStorage.getItem('token');

		if (token) {
			try {
				const decodedToken = jwtDecode<LoginResponse>(token);
				const now = Math.floor(Date.now() / 1000);
				if (decodedToken.exp > now) {
					authContext?.setAuth({
						isAuthenticated: true,
						user: transformUserDataFront(decodedToken.user),
					});
				} else {
					localStorage.removeItem('token');
				}
			} catch (error) {
				console.error('Token decoding failed', error);
				localStorage.removeItem('token');
			}
		}
	}, [authContext]);

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();
		console.log(email, password);
		console.log(airontoolsAPI + '/auth/');
		try {
			const response = await axios.post<LoginResponse>(
				airontoolsAPI + '/auth/login',
				{
					email,
					password,
				},
			);
			console.log(response);

			const { token } = response.data;
			localStorage.setItem('token', token);

			authContext?.setAuth({
				isAuthenticated: true,
				user: transformUserDataFront(response.data.user),
			});
		} catch (error) {
			if (error instanceof AxiosError) {
				const errorMessage = error.response?.data?.message;

				console.log(errorMessage);
				if (typeof errorMessage === 'string') {
					showError(errorMessage);
				} else if (Array.isArray(errorMessage)) {
					showError(errorMessage.join(', '));
				} else {
					showError('Error desconocido al intentar iniciar sesión.');
				}
			} else {
				showError('Error desconocido al intentar iniciar sesión.');
			}
		}
	};

	if (authContext?.isAuthenticated) {
		return <Navigate to={localStorage.getItem('location') || '/home'} />;
	}

	return (
		<>
			<HeaderLogin title={company || ''} />

			{errorLog.isError && <ErrorMessage message={errorLog.message} />}

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
