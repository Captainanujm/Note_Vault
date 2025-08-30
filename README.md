# 📒 Note Vault

A **full-stack note-taking app** with OTP based authentication.  
Built using **Next.js + TailwindCSS (frontend)** and **Node.js + Express + TypeScript + MongoDB (backend)**.  

---

## 🚀 Features
- 🔐 OTP based Signup/Login (Email)
- 📧 Email OTPs via Nodemailer
- 🔑 JWT Authentication (Access + Refresh Tokens)
- ☑️ Keep Me Logged In option
- 📝 Create, Read, Update, Delete Notes
- 🌍 Deployed on Render (backend) & Vercel/Netlify (frontend)

---

## 🏗 Tech Stack

**Frontend**
- Next.js  
- React  
- TailwindCSS  
- Axios  

**Backend**
- Node.js + Express  
- TypeScript  
- MongoDB + Mongoose  
- Nodemailer  
- JSON Web Tokens (JWT)  

---

## ⚙️ Setup Instructions

### Clone the repo
```bash
git clone https://github.com/Captainanujm/Note_Vault.git
cd Note_Vault
```
### Backend Setup
```bash
cd backend
npm install
```
**Create .env in backend***
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```
###Run backend locally
```bash
npm run dev
```
*** For Production ***
```bash
npm run build
npm start
```
###Run frontend locally
```bash
npm run dev
```
*** For Production ***
```bash
npm run build
npm start
```

