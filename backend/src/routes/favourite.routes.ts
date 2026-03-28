import { Router } from 'express';
import { favouriteController } from '../controllers/favourite.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware, favouriteController.getFavourites);
router.post('/:propertyId', authMiddleware, favouriteController.addFavourite);
router.delete('/:propertyId', authMiddleware, favouriteController.removeFavourite);

export default router;
