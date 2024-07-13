import { useContext, useState } from 'react'
import aironLogo from '/vite.svg'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './App';

interface LoginResponse {
    token: string;
    user: UserData;
  }
  
interface DecodedToken {
    id: string;
    iat: number;
    exp: number;
}

interface UserData{
  id: string;
  email: string;
  fullName: string;
  roles: string[];
}

function Login(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const authContext = useContext(AuthContext);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post<LoginResponse>('http://localhost:4000/auth/login', { email, password });
  
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            const decodedToken = jwtDecode<DecodedToken>(token);
            //Obtiene los datos del usuario y los guarda
            
            user.id = decodedToken.id;

            authContext?.setAuth({ isAuthenticated: true, user: user });
          } catch (error) {
            console.error('Login failed', error);
          }
    }
    
    return( <div className='login'>
      <img src={aironLogo} alt='logo de airon tools'></img>
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleLogin}>
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
        <label>¿No tiene una cuenta? Hable con el administrador.</label>
        <button type="submit">Entrar</button>
      </form>
    </div>);
  }

export default Login;