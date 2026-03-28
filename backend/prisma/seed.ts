import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const properties = [
  {
    title: 'Luxury Villa in Kathmandu',
    description: 'A stunning 4-bedroom villa with panoramic mountain views, modern amenities, and a spacious garden.',
    price: 45000000,
    location: 'Budhanilkantha, Kathmandu',
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
  },
  {
    title: 'Modern Apartment in Lalitpur',
    description: 'Elegant 3-bedroom apartment in the heart of Patan with rooftop terrace and parking.',
    price: 18000000,
    location: 'Jawalakhel, Lalitpur',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
  },
  {
    title: 'Cozy House in Bhaktapur',
    description: 'Traditional Newari-style house renovated with modern interiors. 3 bedrooms with courtyard.',
    price: 12000000,
    location: 'Durbar Square, Bhaktapur',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
  },
  {
    title: 'Penthouse in Pokhara',
    description: 'Breathtaking lakeside penthouse with floor-to-ceiling windows facing Phewa Lake and Annapurna range.',
    price: 35000000,
    location: 'Lakeside, Pokhara',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
  },
  {
    title: 'Commercial Space in Thamel',
    description: 'Prime commercial property in the busiest tourist district. Ideal for retail or hospitality business.',
    price: 55000000,
    location: 'Thamel, Kathmandu',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
  },
  {
    title: 'Family Home in Banepa',
    description: 'Spacious 5-bedroom family home with large lawn, parking for 3 cars, and quiet neighborhood.',
    price: 22000000,
    location: 'Banepa, Kavrepalanchok',
    imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
  },
  {
    title: 'Studio Apartment in Baluwatar',
    description: 'Compact and modern studio apartment perfect for young professionals. Close to embassies.',
    price: 8500000,
    location: 'Baluwatar, Kathmandu',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
  },
  {
    title: 'Farmhouse in Nagarkot',
    description: 'Serene farmhouse with 2 acres of land, sunrise views, and organic garden.',
    price: 28000000,
    location: 'Nagarkot, Bhaktapur',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
  },
];

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.favourite.deleteMany();
  await prisma.property.deleteMany();

  // Create initial 8 realistic properties
  await prisma.property.createMany({ data: properties });

  // Generate 42 more for pagination testing
  const generatedProperties = [];
  const locations = [
    'Baneshwor, Kathmandu',
    'Jhamsikhel, Lalitpur',
    'Sauraha, Chitwan',
    'Lumbini, Rupandehi',
    'Dhulikhel, Kavre',
    'Chabahil, Kathmandu',
    'Hetauda, Makwanpur',
    'Itahari, Sunsari',
    'Dharan, Sunsari',
    'Pokhara, Kaski'
  ];

  for (let i = 1; i <= 42; i++) {
    const price = Math.floor(Math.random() * 40000000) + 5000000; // Between 5M and 45M
    const isHouse = i % 2 === 0;
    const typeStr = isHouse ? 'Modern Home' : 'Luxury Apartment';

    generatedProperties.push({
      title: `${typeStr} - Model ${i + 100}`,
      description: `A stunning and newly updated ${typeStr.toLowerCase()} located in the heart of the city. Features include open floor plans, premium appliances, and incredible views.`,
      price: price,
      location: locations[i % locations.length],
      imageUrl: `https://images.unsplash.com/photo-${isHouse ? '1600596542815-ffad4c1539a9' : '1545324418-cc1a3fa10c00'}?auto=format&fit=crop&w=800&q=80`,
    });
  }

  await prisma.property.createMany({ data: generatedProperties });

  console.log(`✅ Seeded ${properties.length + generatedProperties.length} properties in total!`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
