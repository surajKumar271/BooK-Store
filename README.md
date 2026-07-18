# BooK-Store

A full-stack web application for an online bookstore with a React frontend and Node.js/Express backend. This project allows users to browse, search, and purchase books with user authentication and a secure payment system.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **User Authentication**: Secure user registration and login with JWT tokens
- **Book Catalog**: Browse and search for books with detailed information
- **Shopping Cart**: Add/remove books and manage cart items
- **User Accounts**: Manage user profiles and purchase history
- **Responsive Design**: Mobile-friendly UI built with React and Tailwind CSS
- **Security**: Password encryption with bcryptjs and secure API endpoints
- **Database**: MySQL for data persistence

## 🛠 Tech Stack

### Frontend
- **React** 19.2.0 - UI library
- **React Router DOM** 7.9.4 - Client-side routing
- **Axios** 1.13.2 - HTTP client
- **Tailwind CSS** 4.1.14 - Utility-first CSS framework
- **React Icons** 5.5.0 - Icon library
- **React Testing Library** - Testing utilities

### Backend
- **Node.js** - JavaScript runtime
- **Express** 5.2.1 - Web framework
- **MySQL2** 3.15.3 - MySQL database driver
- **JWT** 9.0.3 - JSON Web Tokens for authentication
- **bcryptjs** 3.0.3 - Password hashing
- **CORS** 2.8.5 - Cross-Origin Resource Sharing
- **Body Parser** 2.2.1 - Request body parser
- **dotenv** 17.2.3 - Environment variable management

## 📁 Project Structure

```
BooK-Store/
├── book-store/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
│
├── bookstore-backend/         # Node.js Backend
│   ├── controllers/           # Route controllers
│   ├── models/                # Database models
│   ├── routes/                # API routes
│   ├── middleware/            # Custom middleware
│   ├── server.js              # Entry point
│   ├── package.json
│   └── .env
│
└── README.md
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MySQL** (v5.7 or higher)

## 🚀 Installation

### Clone the Repository

```bash
git clone https://github.com/surajKumar271/BooK-Store.git
cd BooK-Store
```

### Frontend Setup

```bash
cd book-store
npm install
```

### Backend Setup

```bash
cd bookstore-backend
npm install
```

## ⚙️ Configuration

### Backend Configuration

1. Create a `.env` file in the `bookstore-backend` directory:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=bookstore
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

2. Configure your MySQL database:

```sql
CREATE DATABASE bookstore;
USE bookstore;

-- Create users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create books table
CREATE TABLE books (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(100) NOT NULL,
  isbn VARCHAR(20) UNIQUE,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create order_items table
CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  book_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (book_id) REFERENCES books(id)
);
```

### Frontend Configuration

1. Create a `.env` file in the `book-store` directory (if needed):

```env
REACT_APP_API_URL=http://localhost:5000
```

## 🎯 Running the Application

### Start the Backend Server

```bash
cd bookstore-backend
npm run dev
```

The backend will run on `http://localhost:5000`

### Start the Frontend Application

In a new terminal:

```bash
cd book-store
npm start
```

The frontend will open automatically at `http://localhost:3000`

## 📝 Available Scripts

### Backend Scripts

```bash
npm run dev      # Start with hot reload (nodemon)
npm start        # Start production server
npm test         # Run tests
```

### Frontend Scripts

```bash
npm start        # Start development server
npm build        # Build for production
npm test         # Run tests
npm eject        # Eject from Create React App (irreversible)
```

## 🔌 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Book Endpoints

- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create new book (admin)
- `PUT /api/books/:id` - Update book (admin)
- `DELETE /api/books/:id` - Delete book (admin)

### Order Endpoints

- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order status (admin)

## 🗄️ Database Schema

The application uses MySQL with the following main tables:

- **users** - User account information
- **books** - Book catalog
- **orders** - Customer orders
- **order_items** - Individual items in orders

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

**Happy Reading!** 📚
