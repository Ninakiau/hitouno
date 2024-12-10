import { Router } from 'express';
import { catController } from '../controllers/cat.controller';
import { verifyToken } from '../middlewares/jwt.middleware';

const router: Router = Router();


//Leer gatos 
router.get('/', verifyToken,catController.getCats);

//Obtener un gato por id
router.get('/:id', verifyToken,catController.getCat);

// Crear un gato
router.post('/', verifyToken , catController.writeCat);

//Borrar gato
router.delete('/:id', verifyToken , catController.deleteCat);

export default router;