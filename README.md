# Jwellers - MERN Stack Jewelry E-Commerce Platform

A full-featured luxury jewelry e-commerce website built with MongoDB, Express.js, React, and Node.js.

## Features

### Customer Features
- 🏠 Luxury home page with hero section
- 💍 Product catalog with advanced filtering and sorting
- 🔍 Product detail pages with image gallery
- 🛒 Shopping cart with quantity management
- ❤️ Wishlist functionality
- ⭐ Product reviews and ratings
- 📦 Order tracking and history
- 👤 User authentication and profile management
- 💳 Multiple payment options (Card, UPI, Net Banking, COD)

### Admin Features
- 📊 Admin dashboard with statistics
- ➕ Product management (CRUD operations)
- 📁 Category management
- 🚚 Order management and status updates
- 👥 User management
- 📸 Image upload for products

### Technical Features
- ✨ Luxury gold-themed UI design
- 📱 Fully responsive layout
- 🔐 JWT authentication
- 🎨 Tailwind CSS for styling
- 🚀 Fast and optimized with Vite
- 💾 MongoDB for database
- 🔄 RESTful API architecture

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally on port 27017)

### Backend Setup

1. Navigate to server directory:
\`\`\`bash
cd server
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create `.env` file (already created):
\`\`\`env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jwellers
JWT_SECRET=your_jwt_secret_key_change_this_in_production_12345
JWT_EXPIRE=7d
NODE_ENV=development
\`\`\`

4. Seed the database with sample data:
\`\`\`bash
npm run seed
\`\`\`

5. Start the server:
\`\`\`bash
npm run dev
\`\`\`

Server will run on http://localhost:5000

### Frontend Setup

1. Navigate to client directory:
\`\`\`bash
cd client
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

Frontend will run on http://localhost:5173

## Default Login Credentials

### Admin Account
- **Email:** admin@jwellers.com
- **Password:** admin123

### Customer Account
- **Email:** customer@example.com
- **Password:** customer123

## Project Structure

\`\`\`
jwellers/
├── server/                 # Backend
│   ├── controllers/       # Request handlers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── seeds/            # Database seeder
│   ├── uploads/          # Uploaded images
│   ├── .env              # Environment variables
│   ├── server.js         # Entry point
│   └── package.json
│
└── client/                # Frontend
    ├── src/
    │   ├── components/   # Reusable components
    │   ├── pages/        # Page components
    │   ├── context/      # React context
    │   ├── services/     # API services
    │   ├── App.jsx       # Main app component
    │   ├── main.jsx      # Entry point
    │   └── index.css     # Global styles
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
\`\`\`

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user
- POST `/api/auth/logout` - Logout user

### Products
- GET `/api/products` - Get all products (with filters)
- GET `/api/products/:id` - Get single product
- POST `/api/products` - Create product (Admin)
- PUT `/api/products/:id` - Update product (Admin)
- DELETE `/api/products/:id` - Delete product (Admin)
- POST `/api/products/:id/images` - Upload images (Admin)

### Categories
- GET `/api/categories` - Get all categories
- POST `/api/categories` - Create category (Admin)
- PUT `/api/categories/:id` - Update category (Admin)
- DELETE `/api/categories/:id` - Delete category (Admin)

### Cart
- GET `/api/cart` - Get user cart
- POST `/api/cart` - Add to cart
- PUT `/api/cart/:itemId` - Update cart item
- DELETE `/api/cart/:itemId` - Remove from cart
- DELETE `/api/cart` - Clear cart

### Orders
- POST `/api/orders` - Create order
- GET `/api/orders` - Get user orders
- GET `/api/orders/:id` - Get single order
- GET `/api/orders/admin/all` - Get all orders (Admin)
- PUT `/api/orders/:id/status` - Update order status (Admin)

### Wishlist
- GET `/api/wishlist` - Get user wishlist
- POST `/api/wishlist/:productId` - Add to wishlist
- DELETE `/api/wishlist/:productId` - Remove from wishlist

### Reviews
- GET `/api/reviews/product/:productId` - Get product reviews
- POST `/api/reviews` - Create review
- PUT `/api/reviews/:id` - Update review
- DELETE `/api/reviews/:id` - Delete review

## Database Models

- **User** - User accounts with authentication
- **Product** - Jewelry products with details
- **Category** - Product categories
- **Cart** - Shopping cart items
- **Order** - Customer orders
- **Wishlist** - Saved products
- **Review** - Product reviews and ratings

## Sample Data

The database seeder creates:
- 2 users (1 admin, 1 customer)
- 6 categories (Rings, Necklaces, Earrings, Bracelets, Watches, Pendants)
- 15+ sample jewelry products

## Development

### Running Both Servers

Terminal 1 (Backend):
\`\`\`bash
cd server
npm run dev
\`\`\`

Terminal 2 (Frontend):
\`\`\`bash
cd client
npm run dev
\`\`\`

### Building for Production

Backend:
\`\`\`bash
cd server
npm start
\`\`\`

Frontend:
\`\`\`bash
cd client
npm run build
npm run preview
\`\`\`

## Features Overview

### 🎨 Design
- Luxury gold and elegant color scheme
- Smooth animations and transitions
- Glassmorphism effects
- Responsive design for all devices
- Custom Tailwind components

### 🛍️ Shopping Experience
- Browse products by category
- Filter by price range
- Sort by various criteria
- Quick add to cart
- Product image gallery
- Related products

### 👤 User Account
- Secure registration and login
- Profile management
- Address management
- Order history
- Wishlist

### 🔐 Security
- Password hashing with bcrypt
- JWT token authentication
- Protected routes
- Admin-only endpoints

## Contributing

This is a complete MERN stack project ready for customization and extension.

## License

MIT License - Feel free to use this project for learning or commercial purposes.

## Support

For issues or questions, please contact support@jwellers.com

---

**Built with ❤️ using the MERN Stack**
