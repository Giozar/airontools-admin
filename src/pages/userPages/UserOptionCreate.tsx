import HeaderApp from '../../layouts/HeaderApp';
//import {useLocation} from 'react-router-dom';
import BasePage from '../../layouts/BasePage';
import HeaderTitle from '../../components/HeaderTitle';
import { useState } from 'react';
//import ActionCard from './ActionCard';
import '../css/UserOptionsCreate.css'
import {transformUserDataBack, UserDataBackend } from '../../adapter';
import axios from 'axios';
import ComboBox from '../../components/ComboBox';

interface registerResponse {
  token: string;
  user: UserDataBackend;
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
function SuccessLogin({message} : {message : string}){
  return (<p className='success'>{message}</p>);
}
function CreateUserForm(){
  const [file,setFile] = useState("");
  const [text,setText] = useState("Añade una imagen");
  const [email,setEmail] = useState('');
  const [name,setName] = useState('');
  const [password,setPassword] = useState("");
  const [errorLog, setErrorLog] = useState({isError:false,messageError:''});
  const [successLog, setSuccessLog] = useState({ifSuccess:false,message:''});
  const [selectedOption, setSelectedOption] = useState('Elige un rol'); 


  const generatePassword = () =>{
    const charsetNumber = "0123456789";
    const charsetMin = "abcdefghijklmnopqrstuvwxyz";
    const charsetMax = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = 6;
    let newPassword = "";
    for (let i=0; i<passwordLength/3;i++){
      newPassword += charsetNumber.charAt(Math.floor(Math.random() * charsetNumber.length));
      newPassword += charsetMin.charAt(Math.floor(Math.random() * charsetMin.length));
      newPassword += charsetMax.charAt(Math.floor(Math.random() * charsetMax.length));
    }
    console.log(newPassword);
    setPassword(newPassword);
  }
  
  const handleCange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    if (e.target.files){
      setFile(URL.createObjectURL(e.target.files[0]));
      setText("");
    }else
    setText("Añade una imagen");
    
  }
  
  const handleOptionSelected = (selectedOption: string) => {
    setSelectedOption(selectedOption);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<registerResponse>('http://localhost:4000/auth/register', transformUserDataBack({
        email, password, name
        /*TODO: añadir rol y imagen*/
      }));
      const { user } = response.data;         
      console.log(user);
      setSuccessLog({ifSuccess:true,message: "Usuario Creado Con Éxito"});
      } catch (error) {
        if (!axios.isAxiosError<ValidationError>(error)) {
          console.error('Registration failed', error);
          return;
        }
        if(!error.response)
          return;
        console.log(error);
        const errorMessage = error.response.data.message;
        if (typeof errorMessage === "string")
          setErrorLog({isError:true,messageError:errorMessage});
        else
          setErrorLog({isError:true,messageError:errorMessage.join(', ')});      
      }
  }

  return(<>
  { successLog.ifSuccess && <SuccessLogin message={successLog.message}/>}
  { errorLog.isError && <ErrorLogin message={errorLog.messageError}/>}
  
    <div className='register'>
    <form onSubmit={handleSubmit}>
      <div className='profileimage'>
        <div className='image' style={{ backgroundImage: `url(${file})` }}>
          {text}
        </div>
        <input type='file' onChange={handleCange}/>
      </div>
    
      <label htmlFor='name'>Nombre: </label>
      <input
          id='name'
          type="text"
          placeholder="Introduce tu nombre"
          value={name}
          onChange={(e)=>setName((e.target.value))}
          required
        />
      <label htmlFor='email'>Correo electrónico: </label>
      <input
          id='email'
          type="email"
          placeholder="Introduce tu correo electrónico"
          value={email}
          onChange={(e)=>setEmail((e.target.value))}
          required
        />
      <label htmlFor='password'>Contraseña: </label>
      <div className='passwordgenerator'>
        <input type='button' onClick={generatePassword} value="Generar contraseña"/>
        <p>{password}</p>
      </div>
      <label>Rol:</label>
      <ComboBox option={selectedOption} 
      options = {["SuperAdministrador", "Administrador", "Editor"]}
      onOptionSelected={handleOptionSelected}
      />
      <button type="submit" value="Submit">Crear usuario</button>
    </form>
    </div>
    </>
  );
}

function ContentMainPage() {
    //const location = useLocation();
    return (
        <BasePage>
        <HeaderApp ruta="Acciones / Usuario / Crear Usuario" />
        <main>
          <HeaderTitle title="Crear Usuario" />
          <CreateUserForm/>
        </main>
      </BasePage>
    );
}

function UserOptionCreate(){
    return (
        <ContentMainPage/>  
    );
}
export default UserOptionCreate;
/*
function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const authContext = useContext(AuthContext);
  const [errorLog, setErrorLog] = useState({isError:false,messageError:''});


  
  if (authContext?.isAuthenticated){
    return <Navigate to='/home'/>;
  }
  return( 
  <>
  <HeaderLogin/>
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
}*/