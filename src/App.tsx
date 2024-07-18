import { useState, createContext} from 'react'
import { UserDataFrontend} from './adapter';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/MainPage';
import UserOptions from './pages/userPages/UserOptions';
import UserOptionCreate from './pages/userPages/UserOptionCreate';
import UserOptionEdit from './pages/userPages/UserOptionEdit';
import React from 'react';



interface AuthContextType {
  isAuthenticated: boolean;
  user: UserDataFrontend | null;
  setAuth: (auth: { isAuthenticated: boolean; user: UserDataFrontend | null }) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

function App() {
  const [auth, setAuth] = useState<{ isAuthenticated: boolean; user: UserDataFrontend | null }>({
    isAuthenticated: false,
    user: null,
  });

  return (
    <>
    <AuthContext.Provider value={{ ... auth, setAuth }}>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route element={<PrivateRoute/>}>
          <Route path="/home" element={<Home/>}/>  
            <Route element={<PrivateRouteOptionUser/>}>
            <Route path="/home/usuarios" element={<UserOptions/>}/> 
              <Route path="/home/usuarios/crear-usuario" element={<UserOptionCreate/>}/>  
              <Route path="/home/usuarios/editar-usuario" element={<UserOptionEdit/>}/>

            </Route>
        </Route>
      </Routes>
      </BrowserRouter>  
    </AuthContext.Provider>
    </>
  );
}

const PrivateRoute = ()=>{
  const authContext = React.useContext(AuthContext);
  if (!authContext) return null;
  return authContext.isAuthenticated ? < Outlet/> : <Navigate to="/login"/>;
}

const PrivateRouteOptionUser = ()=>{
  const authContext = React.useContext(AuthContext);
  if (!authContext) return null;
  return authContext.isAuthenticated ? < Outlet/> : <Navigate to="/home"/>;
}

export default App
