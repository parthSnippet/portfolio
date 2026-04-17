# Cloudinary Setup for Resume Upload (Works on Vercel)

## Step 1: Create Free Cloudinary Account

1. Go to: https://cloudinary.com/users/register/free
2. Sign up (free forever for basic usage)
3. After login, go to Dashboard

## Step 2: Get Your Credentials

On the Cloudinary Dashboard, you'll see:
- **Cloud Name**: `dxxxxx`
- **API Key**: `123456789012345`
- **API Secret**: `abcdefghijklmnop` (click "eye" icon to reveal)

## Step 3: Update Backend .env

Edit `backend/.env`:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

## Step 4: Restart Backend

```bash
cd backend
npm start
```

## Step 5: Test Upload

1. Go to admin panel: `http://localhost:5173/admin`
2. Upload a PDF resume
3. It will be stored on Cloudinary (not your server)
4. Works on Vercel because files are in the cloud!

## For Production (Vercel):

### Backend Deployment:
1. Deploy backend to **Railway** or **Render** (free tier)
2. Add environment variables there
3. Update API URL in frontend

### Frontend Deployment:
1. Deploy to Vercel as usual
2. Update `src/services/api.js`:
   ```js
   const API_URL = 'https://your-backend.railway.app/api'
   ```

## Why Cloudinary?
- ✅ Free tier: 25GB storage, 25GB bandwidth/month
- ✅ Works with serverless (Vercel)
- ✅ Fast CDN delivery
- ✅ No server storage needed
- ✅ Automatic backups

Your resume uploads will now work on Vercel!
