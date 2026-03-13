# Jwellers

Welcome to **Jwellers**, a modern, full-stack e-commerce platform specifically tailored for jewelry retail. This application provides a seamless shopping experience for customers and a robust management system for administrators. 

Built with the MERN stack (MongoDB, Express, React, Node.js), Jwellers features a beautiful, responsive user interface powered by Tailwind CSS and a secure, scalable backend architecture.

## 🚀 Features

### For Customers
- **Intuitive Shopping Experience:** Browse, search, and filter jewelry collections effortlessly.
- **Secure Authentication:** User registration and login with JWT-based authentication.
- **Interactive Cart & Checkout:** Manage cart items and proceed through a streamlined checkout process.
- **Wishlist Management:** Save favorite items for future reference.
- **Order History & Tracking:** View past orders and track their status.
- **Product Reviews & Ratings:** Leave feedback on purchased products.
- **Fully Responsive Design:** Optimized for mobile, tablet, and desktop devices.

### For Administrators
- **Comprehensive Dashboard:** Overview of sales, orders, and user metrics.
- **Product Management:** Add, edit, and delete products, manage inventory and pricing.
- **Category Management:** Organize products into logical categories.
- **Order Fulfillment:** Update order statuses and track shipments.

## 🛠️ Technology Stack

**Frontend:**
- [React (v18)](https://reactjs.org/)
- [Vite](https://vitejs.dev/) - Lightning-fast development server and bundler
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for rapid UI development
- [React Router (v6)](https://reactrouter.com/) - Declarative routing
- [Axios](https://axios-http.com/) - Promise-based HTTP client
- [Lucide React](https://lucide.dev/) - Beautiful, consistent icons

**Backend:**
- [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/) - Fast, unopinionated web framework
- [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/) - NoSQL database and object data modeling
- [JSON Web Tokens (JWT)](https://jwt.io/) & [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) - Secure authentication and password hashing
- [Multer](https://github.com/expressjs/multer) - Middleware for handling `multipart/form-data` (ideal for image uploads)

## 💻 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v16+ recommended) and [MongoDB](https://www.mongodb.com/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ChauhanAjay1669/jwellers.git
   cd jwellers
   ```

2. **Install Server Dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install Client Dependencies:**
   ```bash
   cd ../client
   npm install
   ```

### Configuration

Create a `.env` file in the `server` directory and add the following environment variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### Running the Application

You'll need to run both the server and the frontend application concurrently.

**Start the Backend Server:**
```bash
cd server
npm run dev
```

**Start the Frontend Client:**
```bash
cd client
npm run dev
```

The server will typically run on `http://localhost:5000`, and the client will be available at `http://localhost:5173`.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/ChauhanAjay1669/jwellers/issues) if you have any suggestions or want to report a bug.

## 📝 License
This project is proprietary. All rights reserved.
