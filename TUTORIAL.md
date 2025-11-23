# Dogs React API - Deployment Tutorial

## Introduction
This tutorial will guide you through deploying the Dogs React API application to Azure Static Web Apps with automatic CI/CD. You'll be able to complete this in approximately 15 minutes.

## What You'll Build
- A React application that displays random dog images
- Deployed on Azure Static Web Apps (free tier)
- Automatic deployment via GitHub Actions
- Live at your own Azure URL

## Prerequisites
Before starting, make sure you have:
- Node.js installed (version 16 or higher) - [Download here](https://nodejs.org/)
- Git installed - [Download here](https://git-scm.com/)
- A GitHub account - [Sign up here](https://github.com/)
- An Azure account - [Sign up here](https://azure.microsoft.com/free/students/)

## Estimated Time: 15 minutes

---

## Step 1: Clone the Repository (2 minutes)

Open your terminal and run:
```bash
git clone https://github.com/SalavuddinShaik/DogsAPI-React.git
cd DogsAPI-React
```

**Expected output:** You should see files being downloaded and be inside the `DogsAPI-React` directory.

---

## Step 2: Install Dependencies (3 minutes)

Run the following command:
```bash
npm install
```

**Expected output:** You'll see a progress bar and eventually "added XXX packages" message.

**Common issue:** If you see errors, make sure Node.js version 16+ is installed:
```bash
node --version
```

---

## Step 3: Run Locally (2 minutes)

Start the development server:
```bash
npm run dev
```

**Expected output:**
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
```

**Verify:** Open your browser to `http://localhost:5173/` and you should see the Dogs React app working!

Press `Ctrl+C` to stop the server when done testing.

---

## Step 4: Deploy to Azure Static Web Apps (6 minutes)

### 4.1 Fork or Use This Repository
If you want your own copy, fork this repository on GitHub. Otherwise, you can deploy directly from this repo if you're a collaborator.

### 4.2 Log into Azure Portal
1. Go to [Azure Portal](https://portal.azure.com/)
2. Sign in with your account

### 4.3 Create Static Web App
1. Click **"Create a resource"**
2. Search for **"Static Web App"**
3. Click **"Create"**

### 4.4 Configure Settings
Fill in the following:
- **Subscription:** Select your subscription (Azure for Students if applicable)
- **Resource Group:** Create new → name it `dogs-react-rg`
- **Name:** Choose a unique name (e.g., `dogs-react-yourname`)
- **Region:** Choose closest to you (e.g., East US)
- **Deployment source:** Select **"GitHub"**

### 4.5 Connect to GitHub
1. Click **"Sign in with GitHub"**
2. Authorize Azure Static Web Apps
3. Select:
   - **Organization:** Your GitHub username
   - **Repository:** DogsAPI-React
   - **Branch:** main

### 4.6 Build Configuration
- **Build Presets:** Select **"React"**
- **App location:** `/` (leave as default)
- **Output location:** `dist`

### 4.7 Create
1. Click **"Review + create"**
2. Click **"Create"**
3. Wait 2-3 minutes for deployment

---

## Step 5: Verify Deployment (2 minutes)

### 5.1 Get Your URL
1. Once deployment completes, click **"Go to resource"**
2. Look for **"URL"** at the top
3. Click the URL to open your live site

### 5.2 Check GitHub Actions
1. Go to your GitHub repository
2. Click the **"Actions"** tab
3. You should see a green checkmark ✅ showing successful deployment

**Your app is now live!** 🎉

---

## Making Changes

Any time you push code to the `main` branch:
1. GitHub Actions automatically triggers
2. Code is built and deployed
3. Live site updates in 2-3 minutes

Try it:
```bash
# Make a change to src/App.jsx
git add .
git commit -m "Test deployment"
git push origin main
```

Watch the Actions tab to see automatic deployment!

---

## Troubleshooting

### Issue: `npm install` fails
**Solution:** 
- Update Node.js to version 16 or higher
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again

### Issue: Port 5173 already in use
**Solution:**
```bash
# Kill the process using the port (Mac/Linux)
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### Issue: Azure deployment fails
**Solution:**
- Check GitHub Actions tab for error details
- Verify build preset is set to "React"
- Ensure output location is set to "dist"
- Check that you have proper permissions on the repository

### Issue: Site shows 404 error
**Solution:**
- Wait 2-3 minutes for initial deployment to complete
- Check Azure portal to ensure deployment succeeded
- Verify the URL is correct

---

## Next Steps

Now that you have the basic deployment working, you can:
- Add Firebase Authentication (Tier 2 of architecture)
- Add a Node.js backend API (Tier 3)
- Add database integration (Tier 4)
- Set up a custom domain name

---

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review GitHub Actions logs for deployment errors
3. Contact team members for assistance

---

**Tutorial created for CPSC-61200 Software Architecture and Design**  
**Lewis University - Sprint 5**  
**Team Members:** Sahithi Chaitanya Musuku, Yugandhar Goud Thalla, Abhishek Raj Anand Makka, Salavuddin Shaik, Abhirekha Thimmasani
