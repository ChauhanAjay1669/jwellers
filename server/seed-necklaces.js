const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jwellers';

// Define schemas inline for quick seeding
const categorySchema = new mongoose.Schema({
    name: String,
    slug: String,
    description: String,
    image: String,
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    originalPrice: Number,
    category: mongoose.Schema.Types.ObjectId,
    images: [String],
    material: String,
    weight: {
        value: Number,
        unit: String
    },
    stockQuantity: Number,
    isFeatured: Boolean,
    isTrending: Boolean,
    isActive: { type: Boolean, default: true },
    rating: Number,
    reviewCount: Number,
    tags: [String]
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);

async function seedDatabase() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected!\n');

        // Clear existing data
        console.log('🗑️  Clearing existing products and categories...');
        await Product.deleteMany({});
        await Category.deleteMany({});
        console.log('✅ Cleared!\n');

        // Create Necklaces Category
        console.log('📁 Creating Necklaces category...');
        const necklacesCategory = await Category.create({
            name: 'Necklaces',
            slug: 'necklaces',
            description: 'Beautiful necklaces for every occasion',
            image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
            isActive: true
        });
        console.log(`✅ Category created with ID: ${necklacesCategory._id}\n`);

        // Create Products
        console.log('📦 Creating products...');
        const products = [
            {
                name: "Solitaire Diamond Pendant",
                description: "Simple yet elegant solitaire diamond pendant on an 18K white gold chain.",
                price: 42000,
                originalPrice: 46000,
                category: necklacesCategory._id,
                images: [
                    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEixxdxMhjCoojz3SnFHWcVVkhXW7pFrXQF_eyFUkYE5KnrStpKLpN76ubpbvS9FrCkJH3ek1HCjN4i_0l6M0LJImnYUhtBT7vc0pDGtsaD1pbmUz-J7oIZF-DH3-QLFWXkyoam8Lx6OFALRoiIRS30gS6dHQTtjhntRD6hauSbnOkTNdXnX92tedjxtKtmg/s1024/_4bbf5a85-0ea8-475e-87f0-e79d2657707a.jpg",
                    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjpqgELeompDUJ7po_01OcnaqbL6ohqW9KQqhMudhBAz6mstlkFxDyGyjOrWLp1PN5NAMWZZukZCr1CvaczlYxHMlBZkYv43zUC0UOOy7_f4At2MUPma0f2YX8e4IQD85cUscjipqsORUmUncW-LIHYmfcQbDKP_1KpsiFpF6LCWoheDQnPiHARLhZdNVT3/s1024/_01e24045-cca5-4182-ac4a-e7568407dd5f.jpg"
                ],
                material: "18K White Gold & Diamond",
                weight: { value: 3.2, unit: "grams" },
                stockQuantity: 22,
                isFeatured: true,
                isTrending: false,
                isActive: true,
                rating: 4.7,
                reviewCount: 88,
                tags: ["diamond", "pendant", "solitaire", "minimalist"]
            },
            {
                name: "Classic Pearl Strand",
                description: "Timeless single-strand cultured pearl necklace with sterling silver clasp.",
                price: 12500,
                originalPrice: 14000,
                category: necklacesCategory._id,
                images: [
                    "https://a.1stdibscdn.com/gia-certified-three-strand-pearl-and-diamond-necklace-for-sale/1121189/j_108572921615485960438/10857292_master.jpeg"
                ],
                material: "Cultured Pearl & Sterling Silver",
                weight: { value: 18, unit: "grams" },
                stockQuantity: 35,
                isFeatured: false,
                isTrending: true,
                isActive: true,
                rating: 4.4,
                reviewCount: 54,
                tags: ["pearl", "classic", "strand", "bride"]
            },
            {
                name: "Rose Gold Bar Necklace",
                description: "Minimal rose gold bar on a delicate chain—perfect for layering.",
                price: 3500,
                originalPrice: 4200,
                category: necklacesCategory._id,
                images: [
                    "https://tse3.mm.bing.net/th/id/OIP.BAIZK69Y7WfLKvf-1h70DwHaHa?w=800&h=800&rs=1&pid=ImgDetMain&o=7&rm=3"
                ],
                material: "Rose Gold Plated Brass",
                weight: { value: 1.8, unit: "grams" },
                stockQuantity: 120,
                isFeatured: false,
                isTrending: true,
                isActive: true,
                rating: 4.2,
                reviewCount: 210,
                tags: ["rose-gold", "minimal", "bar", "layering"]
            },
            {
                name: "Kundan Bridal Set Necklace",
                description: "Traditional kundan necklace with matching earrings—intricate craftsmanship.",
                price: 78000,
                originalPrice: 92000,
                category: necklacesCategory._id,
                images: [
                    "https://i.etsystatic.com/20648724/r/il/2a513a/4119548107/il_1588xN.4119548107_30nv.jpg",
                    "https://tse1.mm.bing.net/th/id/OIP.J9GD6XNPxIBbf9RA4LRhAQHaJ4?w=960&h=1280&rs=1&pid=ImgDetMain&o=7&rm=3",
                    "https://queenssilverjewellery.com/cdn/shop/products/kundan-leela-necklace-set-662751.jpg?v=1708336409"
                ],
                material: "Kundan & Gold Plated Alloy",
                weight: { value: 95, unit: "grams" },
                stockQuantity: 8,
                isFeatured: true,
                isTrending: false,
                isActive: true,
                rating: 4.9,
                reviewCount: 18,
                tags: ["kundan", "bridal", "traditional", "heavy"]
            },
            {
                name: "Pearl & Emerald Bib Necklace",
                description: "Statement bib necklace featuring pearls and emerald accents.",
                price: 54000,
                originalPrice: 62000,
                category: necklacesCategory._id,
                images: [
                    "https://i.etsystatic.com/30916859/r/il/7ea785/4345636833/il_1080xN.4345636833_jvkc.jpg",
                    "https://5.imimg.com/data5/SELLER/Default/2021/2/TN/LX/VS/30869241/krs-7399-1000x1000.JPG"
                ],
                material: "Pearl & Emeralds on Gold Plating",
                weight: { value: 42, unit: "grams" },
                stockQuantity: 12,
                isFeatured: true,
                isTrending: true,
                isActive: true,
                rating: 4.6,
                reviewCount: 67,
                tags: ["statement", "pearls", "emerald", "bib"]
            },
            {
                name: "Minimal CZ Layered Necklace",
                description: "Two-layered necklace with cubic zirconia accents—everyday glam.",
                price: 2200,
                originalPrice: 2800,
                category: necklacesCategory._id,
                images: [
                    "https://tse4.mm.bing.net/th/id/OIP.ghCYQPhiM_NpNf444u1WegHaLH?w=600&h=900&rs=1&pid=ImgDetMain&o=7&rm=3",
                    "https://tse2.mm.bing.net/th/id/OIP.cxVYyuwb68KzJqlOfnYg1QHaKE?w=1000&h=1360&rs=1&pid=ImgDetMain&o=7&rm=3"
                ],
                material: "Gold Plated Brass & Cubic Zirconia",
                weight: { value: 2.4, unit: "grams" },
                stockQuantity: 200,
                isFeatured: false,
                isTrending: true,
                isActive: true,
                rating: 4.1,
                reviewCount: 142,
                tags: ["cz", "layered", "everyday", "affordable"]
            },
            {
                name: "Coin Pendant Necklace",
                description: "Vintage coin pendant on an adjustable chain.",
                price: 1800,
                originalPrice: 2000,
                category: necklacesCategory._id,
                images: [
                    "https://global-uploads.webflow.com/5f89ba7d4b6f3768a94761f2/5f8ef5fb61d3dc0d489a1572_pure-gold-florentine-coin-necklace-jewelry-florence-torrini-1369-italy-double-florin.jpg",
                    "https://tse3.mm.bing.net/th/id/OIP.s290lAMxAWC_0xLs8_tDcgAAAA?w=417&h=626&rs=1&pid=ImgDetMain&o=7&rm=3"
                ],
                material: "Antique Gold Plated Alloy",
                weight: { value: 4.5, unit: "grams" },
                stockQuantity: 80,
                isFeatured: false,
                isTrending: false,
                isActive: true,
                rating: 4.0,
                reviewCount: 33,
                tags: ["coin", "vintage", "pendant", "boho"]
            },
            {
                name: "Rani Haar Traditional Necklace",
                description: "Majestic Rani Haar with layered gold-plated beads — royal look.",
                price: 65000,
                originalPrice: 72000,
                category: necklacesCategory._id,
                images: [
                    "https://5.imimg.com/data5/SELLER/Default/2024/2/386850397/RW/XW/UF/3897216/3-1000x1000.png",
                    "https://i.pinimg.com/originals/91/c7/ef/91c7ef9b7e95b77ed7c6dd3113e9adc4.jpg"
                ],
                material: "Gold Plated Beads & Alloy",
                weight: { value: 120, unit: "grams" },
                stockQuantity: 5,
                isFeatured: true,
                isTrending: false,
                isActive: true,
                rating: 4.8,
                reviewCount: 21,
                tags: ["rani-haar", "traditional", "bridal", "heavy"]
            },
            {
                name: "Pearl Choker Necklace",
                description: "Choker-style cultured pearl necklace with magnetic clasp.",
                price: 9200,
                originalPrice: 10500,
                category: necklacesCategory._id,
                images: [
                    "https://i.etsystatic.com/20648724/r/il/5cba58/4882781030/il_600x600.4882781030_a4cc.jpg"
                ],
                material: "Cultured Pearls & Magnetic Clasp",
                weight: { value: 22, unit: "grams" },
                stockQuantity: 26,
                isFeatured: false,
                isTrending: true,
                isActive: true,
                rating: 4.3,
                reviewCount: 76,
                tags: ["pearl", "choker", "elegant", "magnetic"]
            },
            {
                name: "Gold Plated Long Rope Necklace",
                description: "Long rope-style necklace that can be doubled for layers.",
                price: 7200,
                originalPrice: 8200,
                category: necklacesCategory._id,
                images: [
                    "https://tse4.mm.bing.net/th/id/OIP.aSZMQuFH5rAKe1XCmvpbdgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
                ],
                material: "Gold Plated Alloy",
                weight: { value: 30, unit: "grams" },
                stockQuantity: 44,
                isFeatured: false,
                isTrending: false,
                isActive: true,
                rating: 4.0,
                reviewCount: 29,
                tags: ["rope", "long", "layerable", "gold-plated"]
            }
        ];

        const createdProducts = await Product.insertMany(products);
        console.log(`✅ Created ${createdProducts.length} products!\n`);

        // Summary
        console.log('📊 Database Summary:');
        console.log(`   Categories: ${await Category.countDocuments()}`);
        console.log(`   Products: ${await Product.countDocuments()}`);
        console.log(`   Featured Products: ${await Product.countDocuments({ isFeatured: true })}`);
        console.log(`   Trending Products: ${await Product.countDocuments({ isTrending: true })}`);

        console.log('\n✅ Database seeded successfully!');
        console.log('🚀 You can now start your backend server and frontend!\n');

    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 Connection closed.');
        process.exit(0);
    }
}

seedDatabase();
