import { Router } from 'express';
import { propertyController } from '../controllers/property.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware, propertyController.getAll);
router.get('/:id', authMiddleware, propertyController.getById);

export default router;
