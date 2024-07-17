import HeaderApp from '../../layouts/HeaderApp';
//import {useLocation} from 'react-router-dom';
import BasePage from '../../layouts/BasePage';
import HeaderTitle from '../../components/HeaderTitle';
import { useState } from 'react';
//import ActionCard from './ActionCard';
import '../css/UserOptionsCreate.css'
import {transformUserDataBack, UserDataBackend } from '../../adapter';
import axios from 'axios';

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
  const [role, setRole] = useState('Elige un rol'); 
  const roleOptions = ["Editor", "Administrador","SuperAdministrador" ];

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

  function handleOptionChange(e: React.ChangeEvent<HTMLSelectElement>){
    setRole(e.target.value);
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
      <label htmlFor='options'>Rol:</label>
    
      <select
        id="options"
        value={role} 
        onChange={handleOptionChange}
      >
        {roleOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

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