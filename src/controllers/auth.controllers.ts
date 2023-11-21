import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/auth.services';
import { JwtPayload } from 'jsonwebtoken';

interface RequestExt extends Request {
  user? :  string | JwtPayload
}
export const registerCtrl = async (req: Request, res: Response) => {
    //TODO: usamos la funcion de mis servicios que contienen la logica
    const responseRegister = await registerUser(req.body);
    //TODO: extraemos del cuerpo los datos a guardar
    //const { email, password, username } = req.body;
    //TODO: terminamos el proceso de registro
    res.send(responseRegister);
};

export const loginCtrl = async (req: Request, res: Response) => {
  const responseLogin = await loginUser(req.body);
  //TODO: respuestas
  if(responseLogin === "USUARIO_NO_ENCONTRADO") return res.status(401).send({message: "NO_AUTORIZADO"});
  if(responseLogin === "PASSWORD_INCORRECTO") return res.status(401).send({message: "NO_AUTORIZADO"});
  //TODO: almacenamos la cookie
  res.cookie('token', responseLogin?.token)
  return res.send(responseLogin)
};

export const logoutCtrl = (_req: Request, res: Response) => {
   res.cookie('token', "",{
    expires : new Date(0),
   });
   res.sendStatus(200);//sendStatus es apra que la peticion culmine 
};

export const getProfileCtrl = async (req: RequestExt, res: Response) => {
  res.send({
    message: "Perfil del Usuario",
    user: req.user
})
};