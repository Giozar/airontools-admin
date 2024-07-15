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
interface ValidationError{
  error: string;
  response: string;
  data: string;
  message: string[];
}

function ErrorLogin({message} : {message : string}){
  return (<p className='errorLogin'>{message}</p>);

}

function Login(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const authContext = useContext(AuthContext);
    const [errorLog, setErrorLog] = useState({isError:false,messageError:''});


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post<LoginResponse>('http://localhost:4000/auth/login', { email, password });
  
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            const decodedToken = jwtDecode<DecodedToken>(token);

            user.id = decodedToken.id;

            authContext?.setAuth({ isAuthenticated: true, user: user });
          } catch (error) {
            if (!axios.isAxiosError<ValidationError>(error)) {
              console.error('Login failed', error);
              return;
            }
            if(!error.response)
              return;
            
            const errorMessage = error.response.data.message;
            if (typeof errorMessage === "string")
              setErrorLog({isError:true,messageError:errorMessage});
            else
              setErrorLog({isError:true,messageError:errorMessage.join(', ')});      
          }
    }
    
    return( 
    <>
    { errorLog.isError && <ErrorLogin message={errorLog.messageError}/>}
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