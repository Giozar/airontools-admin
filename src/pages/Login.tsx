import { useContext, useState } from 'react'
import aironLogo from '/Logo-Blanco.png';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../App';
import { UserDataBackend, transformUserData } from '../adapter';
import './css/Login.css';
import { Navigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import useErrorHandling from '../hooks/useErrorHandling';

interface LoginResponse {
  token: string;
  user: UserDataBackend;
}

interface DecodedToken {
    id: string;
    iat: number;
    exp: number;
}

interface ValidationError{
  error: string;
  response: string;
  data: string;
  message: string[];
}

function HeaderLogin(){
  return(
    <header>
      <img src={aironLogo} alt='logo de airon tools' className='logoimg'></img>
      <h1>Administrador de Herramientas AironTools</h1>
    </header>
  );
}

function Login(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const authContext = useContext(AuthContext);
    const { errorLog,showError } = useErrorHandling();
/*
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode<DecodedToken>(token);
          const now = Math.floor(Date.now() / 1000);
          // Check if token is expired
          if (decodedToken.exp > now) {
            authContext?.setAuth({ isAuthenticated: true, user: transformUserData({
              _id: decodedToken.id,
              fullName: "Hola",
              roles: "employee"
            }) });
         } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Token decoding failed', error);
          localStorage.removeItem('token');
        }
      }
    }, [authContext]);
    */
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post<LoginResponse>('http://localhost:4000/auth/login', { email, password });
            
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            
            const decodedToken = jwtDecode<DecodedToken>(token);

            user._id = decodedToken.id;

            authContext?.setAuth({ isAuthenticated: true, user: transformUserData(user) });
             
          } catch (error) {
            if (!axios.isAxiosError<ValidationError>(error)) {
              console.error('Login failed', error);
              return;
            }
            if(!error.response)
              return;

            const errorMessage = error.response.data.message;
            if (typeof errorMessage === "string")
              showError(errorMessage);
            else
              showError(errorMessage.join(', ')); 

          }
    }
    if (authContext?.isAuthenticated){
      return <Navigate to='/home'/>;
    }
    return( 
    <>
    <HeaderLogin/>
    
    {errorLog.isError? <ErrorMessage message={errorLog.message}/>:''}
    
    <div className='login'>
      <form onSubmit={handleLogin}>
        
        <img src={aironLogo} alt='logo de airon tools'></img>
        <h2>Inicio de Sesión</h2>

        <label htmlFor="email">Correo electrónico</label>
        <input
          id='email'
          type="email"
          placeholder="Introduce tu correo electrónico"
          value={email}
          onChange={(e)=>setEmail((e.target.value))}
          required
        />
        <label htmlFor="password">Contraseña</label>
        <input
          id='password'
          type="password"
          placeholder="Introduce tu Contraseña"
          value={password}
          onChange={(e)=>setPassword((e.target.value))}
          required
        />
        <p>¿No tiene una cuenta? Hable con el administrador.</p>
        <button type="submit">Entrar</button>
      </form>
    </div>
    </>
    );
  }

export default Login;