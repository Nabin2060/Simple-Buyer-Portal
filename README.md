# Simple Buyer Portal (Favourites)

A production-ready full-stack application built with Node.js, Express, TypeScript, Prisma, PostgreSQL, and React.

## 🚀 Overview
This application allows real-estate buyers to browse property listings and manage their "Favourites". It focuses on secure authentication, clean architecture, and premium user experience.

## ✨ Key Features
- **Secure Authentication**: JWT-based auth implemented with **HTTP-only cookies** (Best practice: prevents XSS-based token theft).
- **Property Dashboard**: Real-time property listing with status-driven UI.
- **Favourites System**: Add/Remove properties from a personalized list with instant feedback.
- **Backend Pagination**: Efficient server-side pagination integrated with Shadcn UI components.
- **Rich Aesthetics**: Built with Tailwind CSS v4 and Shadcn UI (Radix UI) for a premium feel.
- **Global Error Handling**: Centralized message management and automatic error toasts via Sonner.

## 🛠 Tech Stack
- **Backend**: Node.js, Express, TypeScript, Prisma ORM, Zod (Validation).
- **Frontend**: React (Vite), Tailwind CSS v4, Shadcn UI, Sonner, Axios.
- **Database**: PostgreSQL (via Docker).

## 🏃 Getting Started

### Prerequisites
- Docker Desktop
- Node.js (v18+)
- npm

### 1. Database Setup
Ensure Docker is running, then start the PostgreSQL container:
```bash
cd backend
docker compose up -d
```

### 2. Backend Initialization
```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```
*The server will run on `http://localhost:5000`.*

### 3. Frontend Initialization
```bash
cd frontend
npm install
npm run dev
```
*The portal will run on `http://localhost:5173` (or check terminal output).*

## 🔄 Example Flow
1. **Sign Up**: Navigate to `/register` and create an account.
2. **Login**: Use your credentials on the `/login` page.
3. **Browse**: Explore the property grid. Use the **Shadcn Pagination** at the bottom to view more items.
4. **Favourite**: Click the "Heart" icon on any property to add it to your list.
5. **Filter**: Click "My Favourites" in the dashboard header to see only your liked properties.
6. **Logout**: Log out securely to clear session cookies.

## 🛡 Security Notes
- **Passwords**: Never stored in plain text; hashed using `bcrypt` (10 rounds).
- **Auth**: Tokens are stored in **Secure HTTP-only cookies**. This makes the application resistant to common cross-site scripting (XSS) attacks.
- **Privacy**: All "Favourite" operations are strictly scoped to the authenticated `userId` at the database query level.

## 📝 Author
Antigravity AI (Pair-programmed with USER)
