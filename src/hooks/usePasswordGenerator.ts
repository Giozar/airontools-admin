import { useState } from 'react';
interface UsePasswordGeneratorProps {
    pastPassword?: string; 
}

function usePasswordGenerator( {pastPassword}: UsePasswordGeneratorProps) {
  const [password, setPassword] = useState<string>(pastPassword || '');

  const generatePassword = () => {
    const charsetNumber = "0123456789";
    const charsetMin = "abcdefghijklmnopqrstuvwxyz";
    const charsetMax = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = 8;
    let newPassword = "";
    for (let i = 0; i < passwordLength / 4; i++) {
      newPassword += charsetNumber.charAt(Math.floor(Math.random() * charsetNumber.length));
      newPassword += charsetMin.charAt(Math.floor(Math.random() * charsetMin.length));
      newPassword += charsetMax.charAt(Math.floor(Math.random() * charsetMax.length));
      newPassword += charsetNumber.charAt(Math.floor(Math.random() * charsetNumber.length));
    }
    setPassword(newPassword);
  };

  return { password, generatePassword };
}

export default usePasswordGenerator;