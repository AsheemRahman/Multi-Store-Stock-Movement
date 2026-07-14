# Multi-Store Stock Movement (MERN)

A full-stack inventory management application built with MongoDB, Express.js, React.js, and Node.js.

The application manages product inventory across multiple stores with secure authentication, role-based authorization, stock adjustments, and atomic stock transfers.


## Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Password hashing using bcrypt
- Role-based authorization
    - Admin
    - Shopper



### Admin Features

- Create Products
- Create Stores
- Adjust Stock
- Transfer Stock between Stores
- View stock of every product in every store



### Shopper Features

- View Products
- View Store-wise Stock
- Low Stock Filter



## Tech Stack

### Frontend

- React
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt


## Project Structure

```
Backend
│
├── src
│   ├── config
│   ├── controller
│   ├── middleware
│   ├── model
│   ├── repository
│   ├── routes
│   ├── service
│   ├── utils
│   └── app.js
│
Frontend
│
├── src
│   ├── components
│   ├── pages
│   ├── services
│   └── App.jsx
```



## Installation

### Clone Repository

```bash
git clone <repository-url>

cd Multi-Store-Stock-Movement
```



## Backend Setup

```bash
cd Backend

npm install
```

Create a `.env` file.

Example:

```env

PORT = 8080

CLIENT_URL = ""

MONGO_URI=""

JWT_TOKEN_SECRET_KEY= ""

```

Start Backend

```bash
npm run dev
```

Backend runs at

```
http://localhost:8080
```



## Frontend Setup

```bash
cd Frontend

npm install

npm run dev
```

Create a `.env` file.

Example:

```env

VITE_API_URL= http://localhost:8080/api

```

Frontend runs at

```
http://localhost:5173
```

---

## API Authentication

Login returns a JWT.

Include the token in every protected request.

```
Authorization: Bearer <token>
```

---

## Roles

### Admin

Can

- Create Product
- Create Store
- Adjust Stock
- Transfer Stock

### Shopper

Can

- View Products
- View Stock

Cannot

- Create Product
- Create Store
- Adjust Stock
- Transfer Stock


