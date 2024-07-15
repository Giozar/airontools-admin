import { useState, createContext} from 'react'
import { UserDataFrontend} from './adapter';

import aironLogo from '/vite.svg'
import './App.css'

//Se importan las rutas de los componentes
import Login from './Login';
import Home from './Bienvenida';
import React from 'react';

//Esta interfaz se encarga de guardar el usuario y decir si está logeado o no
interface AuthContextType {
  isAuthenticated: boolean;
  user: UserDataFrontend | null;
  setAuth: (auth: { isAuthenticated: boolean; user: UserDataFrontend | null }) => void;
}
//Crea el contexto de la aplicación, funciona como una variable global
//Que guarda el usuario si esta logeado o no
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

//Es donde está el titulo de la página, esto se puede cambiar de lugar o cambiar
function Header(){
  return(
    <header>
      <img src={aironLogo} alt='logo de airon tools'></img>
      <h1>Administrador de Herramientas AironTools</h1>
    </header>
  );
}

function App() {
  //El estado inicial es que no hay usuario
  const [auth, setAuth] = useState<{ isAuthenticated: boolean; user: UserDataFrontend | null }>({
    isAuthenticated: false,
    user: null,
  });
  //Por ahora solo muestra login o home, esto se puede cambiar en un futuro
  return (
    <>
     <AuthContext.Provider value={{ ... auth, setAuth }}>
        <Header/>
        <PrivateRoute Component={Home}/>
      </AuthContext.Provider>
    </>
  );
}
//Esta funcion puede ser redundante pero es para mostrar login o home dependiendo
function PrivateRoute({ Component }: { Component: React.ComponentType }) {
  const authContext = React.useContext(AuthContext);

  if (!authContext) return null;

  return authContext.isAuthenticated ? <Component /> : <Login/>;
}

export default App
