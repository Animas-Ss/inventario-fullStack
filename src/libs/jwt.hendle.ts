import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';


const JWT_SECRET = process.env.JWT_SECRET || "animas"

//TODO: generamos el token mediante el payload , que seria el id del usuario
export const generateJwt = (id: Types.ObjectId) => {
   const tokenJwt = new Promise((resolve, reject )=> {
        jwt.sign({id}, JWT_SECRET, {
            expiresIn: '2h'
        },(err, token) => {
            if(err) reject(err)
            resolve(token)
        });
    });
    return tokenJwt
}
//TODO: validamos si el token es valido
export const validateJwt = (token: string) => {
   const userJwt = new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err) reject(err)
        resolve(user)
    })
   })
   return userJwt;
}