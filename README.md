# Book Management System

This is a full-stack Book Management System built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to view books, and administrators to manage the book collection.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local installation or MongoDB Atlas account)

## Project Structure

The project is divided into two main folders:

- `client`: The React frontend application (Vite).
- `server`: The Node.js/Express backend API.

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd book_management_backend_system
```

### 2. Backend Setup (Server)

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/book_management
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_super_secret_jwt_key
```

_Note: Replace `MONGODB_URI` with your actual MongoDB connection string if different. `CLIENT_URL` should match the URL where your frontend is running (Vite defaults to port 5173)._

### 3. Frontend Setup (Client)

Navigate to the client directory and install dependencies:

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory with the following variable:

```env
VITE_API_URL=http://localhost:5000
```

_Note: Ensure this matches the URL and PORT where your backend server is running._

## Running the Application

### Start the Backend Server

In the `server` directory, run:

```bash
npm run dev
```

This will start the server with Nodemon (auto-restart on changes) on port 5000 (or the port you specified).

### Start the Frontend Client

In the `client` directory, run:

```bash
npm run dev
```

This will start the Vite development server, typically at `http://localhost:5173`.

## Usage

1.  Open your browser and navigate to the client URL (e.g., `http://localhost:5173`).
2.  **Register/Login**: Create an account or log in.
3.  **Student Dashboard**: View available books.
4.  **Admin Dashboard**: If you have admin privileges, you can add, update, and delete books.

## Testing

The server includes tests using Jest. To run the backend tests:

```bash
cd server
npm test
```
