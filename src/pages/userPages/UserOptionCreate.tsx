import React, { useEffect, useState } from "react";
import HeaderApp from "../../layouts/HeaderApp";
import BasePage from "../../layouts/BasePage";
import HeaderTitle from "../../components/HeaderTitle";
import "../css/UserOptionsCreate.css";
import { useUserRoles } from "../../hooks/useUserRoles";
import { UserRole } from "../../interfaces/UserRole";
import FileUpload from "../../components/FileUpload";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import usePasswordGenerator from "../../hooks/usePasswordGenerator";
import useUserCreate from "../../hooks/useUserCreate";

function CreateUserForm() {
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState("");
  const { password, generatePassword } = usePasswordGenerator({});
  const [roles, setRoles] = useState("Elige un rol");
  const { errorLog, successLog, createUser } = useUserCreate();
  const { userRoles: roleOptions } = useUserRoles();

  useEffect(() => {
  }, [imageUrl])

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoles(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser({password, imageUrl, email, name, roles});
    } catch (error) {
      console.error('Error actualizando usuario:', error);
    }
  };

  return (
    <>
      {successLog.isSuccess && <SuccessMessage message={successLog.message} />}
      {errorLog.isError && <ErrorMessage message={errorLog.message} />}

      <div className="register">
        <form onSubmit={handleSubmit}>
        <FileUpload setImageUrl={setImageUrl} />
          <p style={{ color: 'red' }}>
            {imageUrl === '' ? 'No ha subido una imagen, ¿Quiere continuar?' : ''}
          </p>
          <label htmlFor="name">Nombre:</label>
          <input
            id="name"
            type="text"
            placeholder="Introduce tu nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="email">Correo electrónico:</label>
          <input
            id="email"
            type="email"
            placeholder="Introduce tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Contraseña:</label>
          <div className="passwordgenerator">
            <input id="password" type="button" onClick={generatePassword} value="Generar contraseña" />
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
