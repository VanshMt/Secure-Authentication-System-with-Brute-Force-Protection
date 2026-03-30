# 🔐 Secure Authentication System

A secure authentication system built using Node.js, Express, and MongoDB with advanced cybersecurity features.

---

## 🚀 Features

- User Registration & Login
- Password Hashing using bcrypt
- JWT Authentication
- Protected Routes
- Brute Force Protection (Rate Limiting)
- Login Attempt Logging

---

## 🛡️ Security Features

- Prevents brute-force attacks
- Secure password storage using bcrypt
- Token-based authentication using JWT
- Environment variable protection (.env)

---

## 🧪 API Endpoints

### 🧾 Register
POST /auth/register

### 🔐 Login
POST /auth/login

### 🔒 Protected Route
GET /auth/dashboard

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT (jsonwebtoken)
- bcrypt
- express-rate-limit

---

## 📌 How to Run

```bash
npm install
node index.js

## 📷 Demo Screenshots   ✅ ← ADD HERE

### 🧾 User Registration
![Register](secure-auth-system/screenshots/User-registration.png)

### 🔐 User Login (JWT Token)
![Login](secure-auth-system/screenshots/User-Login.png)

### 🛡️ Brute Force Protection
![Rate Limit](secure-auth-system/screenshots/Rate-Limiter.png)