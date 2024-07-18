import React, { useState } from "react";
import HeaderApp from "../../layouts/HeaderApp";
import BasePage from "../../layouts/BasePage";
import HeaderTitle from "../../components/HeaderTitle";
import { transformUserDataBack, UserDataBackend } from "../../adapter";
import axios from "axios";
import "../css/UserOptionsCreate.css";
import { useUserRoles } from "../../hooks/useUserRoles";
import { UserRole } from "../../interfaces/UserRole";
import FileUpload from "../../components/FileUpload";

interface RegisterResponse {
  token: string;
  user: UserDataBackend;
}

interface ValidationError {
  message: string[];
}

interface FormError {
  isError: boolean;
  message: string;
}

function ErrorLogin({ message }: { message: string }) {
  return <p className="errorLogin">{message}</p>;
}

function SuccessLogin({ message }: { message: string }) {
  return <p className="success">{message}</p>;
}

function CreateUserForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState("Elige un rol");
  const [errorLog, setErrorLog] = useState<FormError>({ isError: false, message: "" });
  const [successLog, setSuccessLog] = useState<FormError>({ isError: false, message: "" });
  
  const { userRoles: roleOptions } = useUserRoles(); /* recuperar roles */

  const generatePassword = () => {
    const charsetNumber = "0123456789";
    const charsetMin = "abcdefghijklmnopqrstuvwxyz";
    const charsetMax = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = 6;
    let newPassword = "";
    for (let i = 0; i < passwordLength / 3; i++) {
      newPassword += charsetNumber.charAt(Math.floor(Math.random() * charsetNumber.length));
      newPassword += charsetMin.charAt(Math.floor(Math.random() * charsetMin.length));
      newPassword += charsetMax.charAt(Math.floor(Math.random() * charsetMax.length));
    }
    setPassword(newPassword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    switch (id) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      default:
        break;
    }
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoles(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<RegisterResponse>("http://localhost:4000/auth/register", transformUserDataBack({ email, password, name, roles }));
      const { user } = response.data;
      console.log(user);
      setSuccessLog({ isError: true, message: "Usuario Creado Con Éxito" });
    } catch (error) {
      if (!axios.isAxiosError<ValidationError>(error)) {
        console.error("Registration failed", error);
        return;
      }
      if (!error.response) return;
      console.log(error);
      const errorMessage = error.response.data.message;
      const message = Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage;
      setErrorLog({ isError: true, message });
    }
  };

  return (
    <>
      {successLog.isError && <SuccessLogin message={successLog.message} />}
      {errorLog.isError && <ErrorLogin message={errorLog.message} />}

      <div className="register">
        <form onSubmit={handleSubmit}>
          <FileUpload />
          <label htmlFor="name">Nombre:</label>
          <input id="name" type="text" placeholder="Introduce tu nombre" value={name} onChange={handleInputChange} required />

          <label htmlFor="email">Correo electrónico:</label>
          <input id="email" type="email" placeholder="Introduce tu correo electrónico" value={email} onChange={handleInputChange} required />

          <label htmlFor="password">Contraseña:</label>
          <div className="passwordgenerator">
            <input type="button" onClick={generatePassword} value="Generar contraseña" />
            <p>{password}</p>
          </div>

          <label htmlFor="options">Rol:</label>
          <select id="options" value={roles} onChange={handleOptionChange}>
            {roleOptions.map((roleOption: UserRole, index) => (
              <option key={index} value={roleOption.name}>
                {roleOption.name}
              </option>
            ))}
          </select>

          <button type="submit">Crear usuario</button>
        </form>
      </div>
    </>
  );
}

function ContentMainPage() {
  return (
    <BasePage>
      <HeaderApp />
      <main>
        <HeaderTitle title="Crear Usuario" />
        <CreateUserForm />
      </main>
    </BasePage>
  );
}

function UserOptionCreate() {
  return <ContentMainPage />;
}

export default UserOptionCreate;
