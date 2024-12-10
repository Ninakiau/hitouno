import {Router} from 'express';
import { userController } from '../controllers/user.controller';
import { verifyToken } from '../middlewares/jwt.middleware';

const router: Router = Router();

// path: http://localhost:3000/api/v1/users 


// Leer Usuarios
router.get('/', verifyToken , userController.getUsers);

// Crear un usuario
router.post('/', userController.createUser);

// Leer un usuario por id
router.get('/:id', verifyToken , userController.getUserById);

//Borrar usuario por id
router.delete('/:id', verifyToken , userController.remove);

// Actualizar un usuario por id
router.put('/:id', verifyToken , userController.updateUser);

export default router;