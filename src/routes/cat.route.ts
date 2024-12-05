import { Router } from 'express';
import { catController } from '../controllers/cat.controller';
import { verifyToken } from '../middlewares/jwt.middleware';

const router: Router = Router();


//Leer gatos 
router.get('/', catController.getCats);

//Obtener un gato por id
router.get('/:id', catController.getCat);

// Crear un gato
router.post('/', verifyToken , catController.writeCat);

export default router;