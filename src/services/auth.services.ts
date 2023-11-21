import { User } from "../interfaces/user.interface";
import usersModel from "../models/users.model";
import { encrypt, verifyEncrypt} from '../libs/bcrypt.handle';
import { Auth } from "../interfaces/auth.interface";
import { generateJwt } from "../libs/jwt.hendle";




export const registerUser = async (user: User)  => {
    const { username, email, password } = user;
    try {
        //TODO: validamos que el email no exista para crearlo de existir no se peude repetir el usuario
        const checkEmail = await usersModel.findOne({ email });
        if (checkEmail) return "the email is already registered"
        //TODO: usamos la funcion para encryptar
        const passHash = await encrypt(password);
        //TODO: creamos un usuario nuevo con el password cifrado
        const newUser = new usersModel({
            username: username,
            email: email,
            password: passHash
        });
        //TODO: para gaurdarlo en la base de datos usamos el metodo save()
        const userSave = await newUser.save();
        return userSave
    } catch (error) {
        return console.log(error)
    }
};

export const loginUser = async (user: Auth) => {
    const {email, password} = user
 try {
    //select se usa cuando en nuestra peticion restringimos la peticion de sierto dato 
    const check = await usersModel.findOne({email}).select('+password');
    if(!check) return "USUARIO_NO_ENCONTRADO"
    const passHash = check.password
    const isMach = await verifyEncrypt(password, passHash);
    if(!isMach) return "PASSWORD_INCORRECTO";
    const token = await generateJwt(check._id)
    const data = {
       token: token,
       id: check._id,
       username: check.username,
       email: check.email,
       createdAt: check.createdAt,
       updatedAt: check.updatedAt
    }
    return data
 } catch (error) {
    return console.log(error)
 }
};