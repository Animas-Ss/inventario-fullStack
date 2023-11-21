import {Router} from 'express';
import { getProfileCtrl, loginCtrl, logoutCtrl, registerCtrl } from '../controllers/auth.controllers';
import { checkSession } from '../middlewares/session';

const router = Router();
//TODO: rutas para registar y logiar ambas son peticones post que que envian datos para guardar o para comparar
router.post('/register', registerCtrl);
router.post('/login', loginCtrl);
router.post('/logout', logoutCtrl);
router.get('/profile', checkSession , getProfileCtrl)

export {router};