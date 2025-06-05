# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Vayunotics Deployment Guide

This guide will help you deploy the Vayunotics application to Vercel (frontend) and Render (backend).

## Prerequisites

1. A Vercel account (https://vercel.com)
2. A Render account (https://render.com)
3. Git repository with your code

## Backend Deployment (Render)

1. Go to Render Dashboard and create a new Web Service
2. Connect your repository
3. Configure the service:
   - Name: vayunotics-backend
   - Environment: Python
   - Build Command: `pip install -r requirements.prod.txt`
   - Start Command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
   - Environment Variables:
     ```
     ALLOWED_ORIGINS=https://your-frontend-url.vercel.app
     MAVLINK_CONNECTION=tcp:127.0.0.1:5760
     ```

## Frontend Deployment (Vercel)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy from the frontend directory:
   ```bash
   cd frontend
   vercel
   ```

3. Set environment variables in Vercel dashboard:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   VITE_WS_URL=wss://your-backend-url.onrender.com/ws
   ```

## Post-Deployment

1. Update the backend's `ALLOWED_ORIGINS` with your Vercel frontend URL
2. Update the frontend's environment variables with your Render backend URL
3. Redeploy both services to apply the changes

## Monitoring

- Vercel Dashboard: Monitor frontend performance and deployments
- Render Dashboard: Monitor backend logs and performance

## Troubleshooting

1. If WebSocket connection fails:
   - Check CORS settings in backend
   - Verify WebSocket URL in frontend
   - Check Render's WebSocket support

2. If API calls fail:
   - Verify API URL in frontend
   - Check backend logs in Render
   - Verify CORS settings

3. If build fails:
   - Check requirements.txt for missing dependencies
   - Verify Node.js version in Vercel
   - Check build logs in both platforms
