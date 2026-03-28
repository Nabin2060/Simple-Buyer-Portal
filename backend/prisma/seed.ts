import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const properties = [
  { title: 'Luxury Villa in Kathmandu', description: 'A stunning 4-bedroom villa with panoramic mountain views, modern amenities, and a spacious garden.', price: 45000000, location: 'Budhanilkantha, Kathmandu', imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800' },
  { title: 'Modern Apartment in Lalitpur', description: 'Elegant 3-bedroom apartment in the heart of Patan with rooftop terrace and parking.', price: 18000000, location: 'Jawalakhel, Lalitpur', imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800' },
  { title: 'Cozy House in Bhaktapur', description: 'Traditional Newari-style house renovated with modern interiors. 3 bedrooms with courtyard.', price: 12000000, location: 'Durbar Square, Bhaktapur', imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800' },
  { title: 'Penthouse in Pokhara', description: 'Breathtaking lakeside penthouse with floor-to-ceiling windows facing Phewa Lake and Annapurna range.', price: 35000000, location: 'Lakeside, Pokhara', imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800' },
  { title: 'Commercial Space in Thamel', description: 'Prime commercial property in the busiest tourist district. Ideal for retail or hospitality business.', price: 55000000, location: 'Thamel, Kathmandu', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800' },
  { title: 'Family Home in Banepa', description: 'Spacious 5-bedroom family home with large lawn, parking for 3 cars, and quiet neighborhood.', price: 22000000, location: 'Banepa, Kavrepalanchok', imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800' },
  { title: 'Studio Apartment in Baluwatar', description: 'Compact and modern studio apartment perfect for young professionals. Close to embassies.', price: 8500000, location: 'Baluwatar, Kathmandu', imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800' },
  { title: 'Farmhouse in Nagarkot', description: 'Serene farmhouse with 2 acres of land, sunrise views, and organic garden.', price: 28000000, location: 'Nagarkot, Bhaktapur', imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' },
  { title: 'Luxury Condo Center', description: 'Newly built beautiful condo with open space and smart home systems.', price: 15500000, location: 'Baneshwor, Kathmandu', imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800' },
  { title: 'Scenic Resort Property', description: 'A large property suitable for a resort or hotel business.', price: 80000000, location: 'Sauraha, Chitwan', imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800' },
  { title: 'Urban Loft in Lazimpat', description: 'Industrial design loft apartment near standard coffee shops.', price: 19000000, location: 'Lazimpat, Kathmandu', imageUrl: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800' },
  { title: 'Traditional Home in Kirtipur', description: 'Renovated 4-story traditional brick house facing the valley.', price: 14000000, location: 'Kirtipur, Kathmandu', imageUrl: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800' },
  { title: 'Garden Bungalow', description: 'Bungalow with fruit trees and huge backyard.', price: 32000000, location: 'Dhapakhel, Lalitpur', imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800' },
  { title: 'Lakeview Resort Cabin', description: 'Small cozy wooden cabin near Begnas Lake.', price: 15000000, location: 'Begnas, Pokhara', imageUrl: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800' },
  { title: 'City Centre Shop', description: 'Small shop space on the ground floor of a busy marketplace.', price: 40000000, location: 'New Road, Kathmandu', imageUrl: 'https://images.unsplash.com/photo-1582087522437-1422ab1a0f8b?w=800' },
  { title: 'Spacious Residential Flat', description: 'Whole floor covering 1500 sq ft, fully furnished.', price: 16000000, location: 'Sanepa, Lalitpur', imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817bc723f4?w=800' },
  { title: 'Premium Duplex', description: 'Two floor unit with a spiral staircase and marble flooring.', price: 24000000, location: 'Gokarna, Kathmandu', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' },
  { title: 'Minimalist Dream House', description: 'White modern architecture, 3 bedrooms, 2 parking lots.', price: 29000000, location: 'Imadol, Lalitpur', imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800' },
  { title: 'Heritage Style Boutique', description: 'Perfect structure for a boutique hotel or a luxury stay.', price: 60000000, location: 'Patan Durbar Square, Lalitpur', imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800' },
  { title: 'Suburban 3 BHK House', description: 'Calm suburban area, fresh air and 24/7 water supply.', price: 17500000, location: 'Thankot, Kathmandu', imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800' },
  { title: 'Rooftop Terrace Flat', description: 'Has exclusive access to a scenic rooftop. 2 BHK.', price: 11000000, location: 'Bhaisepati, Lalitpur', imageUrl: 'https://images.unsplash.com/photo-1556020685-e63198873254?w=800' },
  { title: 'Commercial Building', description: '5 story building, suitable for a corporate office.', price: 120000000, location: 'Putalisadak, Kathmandu', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800' },
  { title: 'Riverside Retreat', description: 'Beautiful house facing the Trishuli river with a huge garden.', price: 34000000, location: 'Kurintar, Chitwan', imageUrl: 'https://images.unsplash.com/photo-1472224371017-08207f84aaae?w=800' },
  { title: 'Tea Estate Bungalow', description: 'Located near a tea garden, perfect for a peaceful getaway.', price: 45000000, location: 'Ilam, Nepal', imageUrl: 'https://images.unsplash.com/photo-1524815456396-857eaf68bfb3?w=800' },
  { title: 'Mountain View House', description: 'Clear view of the Machhapuchhre mountain from the balcony.', price: 27000000, location: 'Sarangkot, Pokhara', imageUrl: 'https://images.unsplash.com/photo-1542314831-c6a4d27ce006?w=800' },
  { title: 'Shared Office Space', description: 'Fully furnished, high speed internet, ready to move in.', price: 7000000, location: 'Naxal, Kathmandu', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800' },
  { title: 'Twin Villa', description: 'Two identical villas sold together, great for extended families.', price: 65000000, location: 'Sitapaila, Kathmandu', imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09be1587?w=800' },
  { title: 'Luxury Pad near Airport', description: 'High security apartment complex near TIA.', price: 21000000, location: 'Sinamangal, Kathmandu', imageUrl: 'https://images.unsplash.com/photo-1560448205-0cdce1729606?w=800' },
  { title: 'Quiet Residential Plot', description: 'Empty plot of land ready for construction.', price: 9000000, location: 'Godawari, Lalitpur', imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800' },
  { title: 'Jungle Safari Lodge', description: 'Eco-lodge near the national park entrance.', price: 85000000, location: 'Meghauli, Chitwan', imageUrl: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800' },
  { title: 'Corner House', description: '2 side road access, very sunny and airy.', price: 26000000, location: 'Chabahil, Kathmandu', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' },
  { title: 'Affordable 2BHK', description: 'Newly painted, budget-friendly apartment for small families.', price: 6500000, location: 'Koteshwor, Kathmandu', imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800' },
  { title: 'Gated Community Home', description: 'Inside a luxury colony with pool and gym access.', price: 42000000, location: 'Hattiban, Lalitpur', imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09be1587?w=800' },
  { title: 'High-rise Penthouse', description: '15th-floor grand penthouse facing the south.', price: 60000000, location: 'Gwarko, Lalitpur', imageUrl: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800' },
  { title: 'Old Rana Mansion', description: 'A heritage mansion with huge historical value.', price: 250000000, location: 'Kamaladi, Kathmandu', imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800' },
  { title: 'Valley View Cottage', description: 'Cute cottage surrounded by pine trees.', price: 13500000, location: 'Pharping, Kathmandu', imageUrl: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800' },
  { title: 'Hills Retreat', description: 'Perfect temperature all year round.', price: 19500000, location: 'Kakani, Nuwakot', imageUrl: 'https://images.unsplash.com/photo-1542314831-c6a4d27ce006?w=800' },
  { title: 'Highway Touch Land', description: 'Perfect for building a gas station or a motel.', price: 30000000, location: 'Naubise, Dhading', imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800' },
  { title: 'Downtown Flat', description: 'Just 5 mins walk to the major bus parks.', price: 12500000, location: 'Gongabu, Kathmandu', imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800' },
  { title: 'Luxury Eco Home', description: 'Fully solar powered, rainwater harvesting included.', price: 38000000, location: 'Budhanilkantha, Kathmandu', imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800' },
  { title: 'Standard Home in Dhumbarahi', description: 'Good neighborhood, 13 ft road access.', price: 24500000, location: 'Dhumbarahi, Kathmandu', imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800' },
  { title: 'Budget Room for Renters', description: 'Multiple rooms available, high rental yield.', price: 21000000, location: 'Kalanki, Kathmandu', imageUrl: 'https://images.unsplash.com/photo-1556020685-e63198873254?w=800' },
  { title: 'New Construction Villa', description: 'Premium European fittings and fixtures.', price: 50000000, location: 'Baluwatar, Kathmandu', imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800' },
  { title: 'Bespoke Private Estate', description: 'Expansive private estate with a large swimming pool.', price: 150000000, location: 'Godawari, Lalitpur', imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800' },
  { title: 'Cosy 1 BHK', description: 'Ideal setup for a bachelor or single student.', price: 4500000, location: 'Kapan, Kathmandu', imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800' },
  { title: 'Retail Space', description: 'On the main highway, very high foot traffic.', price: 48000000, location: 'Tripureshwor, Kathmandu', imageUrl: 'https://images.unsplash.com/photo-1582087522437-1422ab1a0f8b?w=800' },
  { title: 'Student Hostel Building', description: 'Can accommodate 50 students, fully operational.', price: 65000000, location: 'Putalisadak, Kathmandu', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800' },
  { title: 'Family Flat in Maharajgunj', description: 'Near the teaching hospital, well maintained.', price: 16500000, location: 'Maharajgunj, Kathmandu', imageUrl: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800' },
  { title: 'Artisan Workshop Space', description: 'Large warehouse with high ceilings.', price: 22000000, location: 'Patan Industrial Estate, Lalitpur', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800' },
  { title: 'Luxury Skyscraper Condo', description: 'Breathtaking 360-degree views of the valley.', price: 75000000, location: 'Naxal, Kathmandu', imageUrl: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800' }
];

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.favourite.deleteMany();
  await prisma.property.deleteMany();

  // Seed all 50 properties
  await prisma.property.createMany({ data: properties });

  console.log(`✅ Seeded ${properties.length} real Nepal-based properties successfully!`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
