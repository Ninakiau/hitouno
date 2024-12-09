import {Router} from 'express';
import { userController } from '../controllers/user.controller';
import { verifyToken } from '../middlewares/jwt.middleware';

const router: Router = Router();

// path: http://localhost:3000/api/v1/users - Donde haremos las peticiones
// SI YO PONGO router.use(veryfyToken) TODAS LAS RUTAS QUE ESTEN DEBAJO DE ESTA LINEA NECESITARAN UN TOKEN PARA SER ACCEDIDAS


// Leer Usuarios
router.get('/users', verifyToken , userController.getUsers);

// Crear un usuario
router.post('/users', userController.createUser);

// Leer un usuario por id
router.get('/users/:id', verifyToken , userController.getUserById);

//Borrar usuario por id
router.delete('/users/:id', verifyToken , userController.remove);

// Actualizar un usuario por id
router.put('/users/:id', verifyToken , userController.updateUser);

export default router;