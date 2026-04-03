const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const products = [
    // Consumer electronics and gadgets
    { name: "Canon Camera EOS 2000, Black 10x zoom", price: 998.00, oldPrice: 1128.00, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop", description: "Professional DSLR camera with high resolution and superior low-light performance.", category: "consumer electronics and gadgets", stock: 25, rating: 4.5, reviews: 154, isFeatured: true },
    { name: "GoPro HERO6 4K Action Camera - Black", price: 799.00, oldPrice: 899.00, image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=600&auto=format&fit=crop", description: "Ultra-portable 4K action camera for extreme sports and outdoor adventures.", category: "consumer electronics and gadgets", stock: 50, rating: 4.8, reviews: 210, isFeatured: true },
    { name: "Apple Watch Series 7 GPS - Midnight", price: 399.00, image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?q=80&w=600&auto=format&fit=crop", description: "Advanced fitness tracker and ecosystem companion.", category: "consumer electronics and gadgets", stock: 100, rating: 4.6, reviews: 85 },
    { name: "Sony WH-1000XM4 Wireless Noise Cancelling", price: 249.00, oldPrice: 349.00, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop", description: "Industry-leading noise cancellation and premium audio quality.", category: "consumer electronics and gadgets", stock: 75, rating: 4.7, reviews: 120 },
    { name: "MacBook Pro 14 M3 Chip - Space Gray", price: 1599.00, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop", description: "The most powerful laptop for creators and professionals.", category: "consumer electronics and gadgets", stock: 15, rating: 4.9, reviews: 45 },

    // Home and outdoor
    { name: "Scandinavian Soft Velvet Chair", price: 145.00, oldPrice: 180.00, image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=600&auto=format&fit=crop", description: "Minimalist design with maximum comfort for your living space.", category: "home and outdoor", stock: 100, rating: 4.2, reviews: 45 },
    { name: "Premium Ceramic Dinnerware Set", price: 89.00, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop", description: "Elegant ceramic set perfect for daily use or dinner parties.", category: "home and outdoor", stock: 200, rating: 4.5, reviews: 67 },
    { name: "Weber Pulse 1000 Electric Grill", price: 250.00, image: "https://plus.unsplash.com/premium_photo-1693221704991-e82d7573817b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "High-performance electric grill for perfect backyard BBQ.", category: "home and outdoor", stock: 30, rating: 4.4, reviews: 20 },
    { name: "Heirloom Garden Tool Set - 5 Piece", price: 45.00, image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?q=80&w=600&auto=format&fit=crop", description: "Stainless steel tools with ergonomic wooden handles.", category: "home and outdoor", stock: 60, rating: 4.3, reviews: 15 },
    { name: "Aura Modern Floor Lamp", price: 125.00, oldPrice: 150.00, image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=600&auto=format&fit=crop", description: "Contemporary lighting solution for modern interiors.", category: "home and outdoor", stock: 120, rating: 4.6, reviews: 30 },

    // Clothing and apparel
    { name: "Classic Cotton Blue T-shirt", price: 15.00, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop", description: "Breathable cotton fabric for all-day comfort.", category: "clothing and apparel", stock: 300, rating: 4.1, reviews: 50 },
    { name: "Urban Legend Leather Jacket", price: 185.00, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop", description: "Genuine leather jacket with a sleek urban fit.", category: "clothing and apparel", stock: 40, rating: 4.5, reviews: 25 },
    { name: "FlexiFit Yoga Pants - Maroon", price: 35.00, image: "https://images.squarespace-cdn.com/content/v1/5f3b0512bd6e79400b0b2f1a/1618538532957-OBABZL0F0BUQJDK1UHMJ/all-over-print-yoga-leggings-white-right-front-6078edbf19f17.jpg?format=1000w", description: "Stretchable and moisture-wicking gear for active lifestyle.", category: "clothing and apparel", stock: 150, rating: 4.6, reviews: 40 },
    { name: "Vintage Floral Summer Dress", price: 45.00, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=600&auto=format&fit=crop", description: "Light and airy dress for warm summer days.", category: "clothing and apparel", stock: 80, rating: 4.4, reviews: 20 },
    { name: "Rugged Terrain Winter Boots", price: 110.00, image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=600&auto=format&fit=crop", description: "Waterproof boots with thermal insulation.", category: "clothing and apparel", stock: 45, rating: 4.2, reviews: 10 },

    // Toys and hobby
    { name: "Lego Technic Bugatti Bolide", price: 50.00, image: "https://i1.wp.com/storage.googleapis.com/stateless-watchilove-com/2023/01/8b4fac37-01-bugatti_lego-bolide-1024x683.jpg?ssl=1", description: "Detailed building kit for car enthusiasts.", category: "toys and hobby", stock: 90, rating: 4.8, reviews: 60 },
    { name: "Dji Mini 3 Pro Drone 4K", price: 750.00, image: "https://image.made-in-china.com/202f0j00ngzoiSeyGJqk/Dji-Mini-3-PRO-No-RC-Lightweight-and-Foldable-Camera-Drone-with-4K-60fps-Video-Tri-Directional-Obstacle-Sensing-Uav-Mini-Shaped-Quadcopter.webp", description: "Professional grade compact drone with 4K camera.", category: "toys and hobby", stock: 20, rating: 4.6, reviews: 15 },
    { name: "Classic Wooden Chess Set", price: 35.00, image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=600&auto=format&fit=crop", description: "Handcrafted wooden chess pieces and board.", category: "toys and hobby", stock: 100, rating: 4.9, reviews: 88 },

    // Machinery and tools
    { name: "Bosch Professional Cordless Drill", price: 175.00, image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=600&auto=format&fit=crop", description: "Heavy-duty cordless drill with dual battery pack.", category: "machinery and tools", stock: 60, rating: 4.4, reviews: 40 },
    { name: "Industrial Angle Grinder 1200W", price: 85.00, image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600&auto=format&fit=crop", description: "Powerful grinder for metalwork and construction.", category: "machinery and tools", stock: 40, rating: 4.3, reviews: 20 }
];

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('MongoDB connected for seeding...');
        await Product.deleteMany();
        await Product.insertMany(products);

        // Seed an Admin User for testing
        await User.deleteOne({ email: 'admin@example.com' });
        const admin = new User({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'adminpassword123',
            isAdmin: true
        });
        await admin.save();
        console.log('Admin user seeded: admin@example.com / adminpassword123');

        console.log(`Seeded ${products.length} products successfully!`);
        process.exit();
    })
    .catch(err => {
        console.error('Seeding error:', err);
        process.exit(1);
    });
