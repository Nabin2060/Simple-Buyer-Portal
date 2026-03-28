import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { favouriteService } from '../services/favourite.service';
import { sendSuccess } from '../utils/response';
import { MESSAGES } from '../utils/messages.constants';

export const favouriteController = {
  async getFavourites(req: AuthRequest, res: Response) {
    const favourites = await favouriteService.getUserFavourites(req.userId!);
    sendSuccess(res, 200, MESSAGES.FAVOURITE.FETCHED, favourites);
  },

  async addFavourite(req: AuthRequest, res: Response) {
    const { propertyId } = req.params;
    const result = await favouriteService.addFavourite(req.userId!, propertyId);
    sendSuccess(res, 201, result.message);
  },

  async removeFavourite(req: AuthRequest, res: Response) {
    const { propertyId } = req.params;
    const result = await favouriteService.removeFavourite(req.userId!, propertyId);
    sendSuccess(res, 200, result.message);
  },
};
