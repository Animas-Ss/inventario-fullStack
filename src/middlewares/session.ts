import { NextFunction, Response, Request } from "express";
import { validateJwt } from "../libs/jwt.hendle";
import { JwtPayload } from "jsonwebtoken";

interface RequestExt extends Request {
    user? :  string | JwtPayload
}

export const checkSession = async (req: RequestExt, res: Response, next: NextFunction) =>{
    try {
        const {token} = req.cookies
        console.log(token)
        if(!token) return res.status(400).send("NO_AUTHORIZATION")
        const userJwt = await validateJwt(token);
    console.log(userJwt)
         if(!userJwt) {
             res.status(401)
             res.send("NO_TIENE_TOKEN_VALIDO")
         }else{
             req.user = userJwt
             return next();
         }
    } catch (error) {
        return res.status(400).send("SESSION_NO_VALIDA")
    }
};