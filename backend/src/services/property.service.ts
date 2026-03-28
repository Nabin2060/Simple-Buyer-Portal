import prisma from '../lib/prisma';

export const propertyService = {
  async getAll(page: number = 1, limit: number = 8) {
    const skip = (page - 1) * limit;
    
    const [data, total] = await Promise.all([
      prisma.property.findMany({
        skip,
        take: limit,
        where: { isDeleted: false },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.property.count({ where: { isDeleted: false } }),
    ]);

    return {
      items: data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getById(id: string) {
    return prisma.property.findFirst({ where: { id, isDeleted: false } });
  },
};
