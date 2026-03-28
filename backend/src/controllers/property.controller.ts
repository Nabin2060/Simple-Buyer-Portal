import { Request, Response } from 'express';
import { propertyService } from '../services/property.service';
import { sendSuccess, sendError } from '../utils/response';
import { MESSAGES } from '../utils/messages.constants';

export const propertyController = {
  async getAll(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 8;
    
    const result = await propertyService.getAll(page, limit);
    sendSuccess(res, 200, MESSAGES.PROPERTY.FETCHED, result);
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const property = await propertyService.getById(id);
      if (!property) {
        return sendError(res, 404, 'Property not found');
      }
      sendSuccess(res, 200, 'Property fetched successfully', property);
    } catch (error) {
       sendError(res, 500, 'Error fetching property');
    }
  }
};
