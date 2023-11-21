import bcrypt from 'bcryptjs';

//TODO: para encryptar las contraseñas
export const encrypt = async (password: string) => {
  const passwordHash = await bcrypt.hash(password, 10);
  return passwordHash;
};
//TODO: para comparar las contraseñas encryptadas
export const verifyEncrypt = async (password: string, passHash: string) => {
  const isCorrect = await bcrypt.compare(password, passHash);
  return isCorrect;
}