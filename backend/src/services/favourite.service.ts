import prisma from '../lib/prisma';
import { BadRequestError, ConflictError, NotFoundError } from '../utils/errors';
import { MESSAGES } from '../utils/messages.constants';

export const favouriteService = {
  async getUserFavourites(userId: string) {
    const favourites = await prisma.favourite.findMany({
      where: { userId, isDeleted: false, property: { isDeleted: false } },
      include: {
        property: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return favourites.map((f) => f.property);
  },

  async addFavourite(userId: string, propertyId: string) {
    if (!propertyId) {
      throw new BadRequestError(MESSAGES.PROPERTY.ID_REQUIRED);
    }

    const property = await prisma.property.findFirst({
      where: { id: propertyId, isDeleted: false },
    });

    if (!property) {
      throw new NotFoundError(MESSAGES.PROPERTY.NOT_FOUND);
    }

    const existing = await prisma.favourite.findUnique({
      where: {
        userId_propertyId: { userId, propertyId },
      },
    });

    if (existing && !existing.isDeleted) {
      throw new ConflictError(MESSAGES.FAVOURITE.ALREADY_EXISTS);
    }

    if (existing && existing.isDeleted) {
      await prisma.favourite.update({
        where: { userId_propertyId: { userId, propertyId } },
        data: { isDeleted: false },
      });
    } else {
      await prisma.favourite.create({
        data: { userId, propertyId },
      });
    }

    return { message: MESSAGES.FAVOURITE.ADDED };
  },

  async removeFavourite(userId: string, propertyId: string) {
    if (!propertyId) {
      throw new BadRequestError(MESSAGES.PROPERTY.ID_REQUIRED);
    }

    const existing = await prisma.favourite.findUnique({
      where: {
        userId_propertyId: { userId, propertyId },
      },
    });

    if (!existing || existing.isDeleted) {
      throw new NotFoundError(MESSAGES.FAVOURITE.NOT_FOUND);
    }

    await prisma.favourite.update({
      where: {
        userId_propertyId: { userId, propertyId },
      },
      data: { isDeleted: true },
    });

    return { message: MESSAGES.FAVOURITE.REMOVED };
  },

  async isFavourite(userId: string, propertyId: string) {
    const favourite = await prisma.favourite.findUnique({
      where: {
        userId_propertyId: { userId, propertyId },
      },
    });

    return !!favourite && !favourite.isDeleted;
  },
};
