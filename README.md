# Simple Buyer Portal

A full-stack real estate property portal built with React, Node.js, Express, and PostgreSQL. It allows users to browse properties, view details, and manage their favorite listings.

## Tech Stack
- Frontend: React (Vite), Tailwind CSS, React Router
- Backend: Node.js, Express, TypeScript
- Database: PostgreSQL, Prisma ORM
- Security: HTTP-only cookies, JWT rotation (Access + Refresh tokens), Rate Limiting, Morgan Logging

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- PostgreSQL (or Docker to run the database)

## Project Setup

### 1. Database Setup
If you are using Docker for the database, you can start it using the provided compose file:
```bash
cd backend
docker-compose up -d
```
*(If you are using a local PostgreSQL installation, ensure your server is running and create a database named `buyer_portal`.)*

### 2. Backend Setup
Open a new terminal and navigate to the backend directory:
```bash
cd backend
npm install
```

Set up your environment variables. Copy the example file and update it if necessary:
```bash
cp .env.example .env
```

Push the database schema and seed the initial property data:
```bash
npx prisma db push
npx prisma generate
npm run seed
```

Start the backend development server:
```bash
npm run dev
```
The server will start on `http://localhost:5000`.

### 3. Frontend Setup
Open another terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
```

Set up your frontend environment variables:
```bash
cp .env.example .env
```

Start the frontend development server:
```bash
npm run dev
```
The frontend will be available at `http://localhost:5173`.

## Viewing the Database (Prisma Studio)
You can easily view and manage your database records (Users, Properties, Favourites) using Prisma Studio, a visual database GUI.

Open a new terminal in the `backend` directory and run:
```bash
cd backend
npx prisma studio
```
This will automatically open Prisma Studio in your default web browser (usually at `http://localhost:5555`).

## Core Features
- User Authentication: Secure login and registration using short-lived access tokens (15m) and refresh tokens (7d).
- Property Listing: Browse through responsive real estate property cards.
- Favourites Management: Users can save and unsave properties they like.
- Soft Delete Pattern: Data is never fully deleted; records are marked with an `isDeleted` flag instead.
- Audit Logging: All critical backend requests are logged accurately to a local file.

