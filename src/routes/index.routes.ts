import { Router } from 'express';
import { readdirSync } from 'fs';

//TODO: guardamos la ruta en una constante , la optenemos con el __dirname
const PATH_ROUTER = `${__dirname}`;
const router = Router();
//TODO: creamos una funcion para remover las exptenciones de mis rutas
const cleanFileName = (fileName: string) => {
    const file = fileName.split('.').shift() //esto me devuelve el primer elemento
    return file
}
//TODO: recorremos los archivos de la ruta indicada que es la actual
readdirSync(PATH_ROUTER).filter((fileName) => {
    const cleanName = cleanFileName(fileName);
    if(cleanName !== "index"){
        console.log(`Se esta cargando la ruta /${cleanName}`)
        //OPTIMIZE: aclaracion importante como mis rutas tienen un nombre con.routes es encesario que al importar los archivos le agregue dicho nombre sino sale error
        import(`./${cleanName}.routes`).then((moduleRouter) => {
            router.use(`/${cleanName}`, moduleRouter.router)
        });
    }
})
//TODO: exportamos las rutas creadas
export {router};

//FIX: repasar esta parte de rutas dinamicas !!