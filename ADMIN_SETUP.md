# Portfolio Admin Panel Setup

## Prerequisites
- Node.js installed
- MongoDB installed and running

## Setup Steps

### 1. Install MongoDB (if not installed)
Download from: https://www.mongodb.com/try/download/community

### 2. Start MongoDB
```bash
mongod
```

### 3. Start Backend Server
```bash
cd backend
npm start
```
Backend will run on http://localhost:5000

### 4. Create Admin User (First Time Only)
Open Postman or use curl:
```bash
curl -X POST http://localhost:5000/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your-password-here"}'
```

### 5. Start Frontend
```bash
npm run dev
```

## Access Admin Panel

1. Go to: http://localhost:5173/admin
2. Login with your username and password
3. Edit portfolio content
4. Click "Save Changes"
5. View changes on main site: http://localhost:5173/

## Features

✅ Edit basic info (name, role, email, location, tagline, about)
✅ Manage skills categories
✅ Add/edit/delete projects
✅ Changes reflect immediately on main portfolio
✅ Secure JWT authentication
✅ MongoDB database storage

## API Endpoints

- `POST /api/admin/register` - Create admin user
- `POST /api/admin/login` - Login
- `GET /api/portfolio` - Get portfolio data (public)
- `PUT /api/portfolio` - Update portfolio (protected)

## Environment Variables

Create `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-key
```

## Deployment

For production:
1. Deploy backend to Heroku/Railway/Render
2. Use MongoDB Atlas for database
3. Update API_URL in `src/services/api.js`
4. Deploy frontend to Vercel/Netlify
