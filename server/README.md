# Task Management Backend
Hosted Domain : https://reunion-task-management.vercel.app/

## Overview
This is a backend part of full-stack task management application backend built with Node.js, Express, and MongoDB.

## Features
- User Authentication (Signup/Login)
- CRUD Operations for Tasks
- Task Statistics Dashboard
- Secure Routes with JWT Authentication

## Prerequisites
- Node.js (v14+)
- MongoDB

## Installation
1. Clone the repository
2. Install dependencies
```bash
npm install
```

3. Create a `.env` file with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Running the Application
- Development: `npm run dev`
- Production: `npm start`

## API Endpoints
- `/api/users/...` - User API's
- `/api/tasks/...` - Task API's

## Authentication
- Uses JWT for secure authentication
- All task routes are protected and require a valid token

## Project Structure
- `config/` - Database and configuration files
- `controllers/` - Business logic
- `models/` - Mongoose schemas
- `routes/` - API route definitions
- `middleware/` - Authentication middleware
- `utils/` - Utility functions

## Technologies
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
