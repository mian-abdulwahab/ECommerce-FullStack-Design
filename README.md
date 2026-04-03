# Ecommerce Full-Stack Project

This project consists of a React frontend and an Express backend.

## Prerequisites
- Node.js (v16+)
- MongoDB (Running locally on `mongodb://localhost:27017/ecommerce` or update `.env`)

## Installation

1. Clone the repository.
2. Install Backend dependencies:
   ```bash
   cd server
   npm install
   ```
3. Install Frontend dependencies:
   ```bash
   cd client
   npm install
   ```

## Running the Application

### 1. Start the Backend Server
```bash
cd server
npm run dev
```
The server will run on [http://localhost:5000](http://localhost:5000).

### 2. Start the Frontend (Vite)
```bash
cd client
npm run dev
```
The frontend will run on [http://localhost:5173](http://localhost:5173).

## Features Implemented
- **Home Page**: Fully responsive design matching Figma.
- **Project Structure**: Organized for easy deployment and development.
- **Backend Boilerplate**: Express + Mongoose + JWT setup.
